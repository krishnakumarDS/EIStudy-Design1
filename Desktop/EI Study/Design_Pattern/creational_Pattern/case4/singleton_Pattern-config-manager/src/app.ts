import { ConfigurationManager } from "./ConfigurationManager";
import { ConfigItem } from "./models/ConfigItem";
import { ConfigType } from "./models/ConfigType";
import { Logger } from "./services/Logger";
import { InputValidator } from "./services/InputValidator";
import { ErrorHandler } from "./services/ErrorHandler";
import * as readline from "readline";

export class ConfigManagerApp {
  private configManager: ConfigurationManager;
  private logger: Logger;
  private rl: readline.Interface;

  constructor() {
    this.configManager = ConfigurationManager.getInstance();
    this.logger = Logger.getInstance("ConfigManagerApp");
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async run(): Promise<void> {
    this.logger.info("Starting Configuration Manager Application");

    try {
      await this.showMainMenu();
    } catch (error) {
      ErrorHandler.handle(error as Error, "Main Application Loop");
    } finally {
      this.rl.close();
      this.logger.info("Application terminated");
    }
  }

  private async showMainMenu(): Promise<void> {
    let running = true;

    while (running) {
      try {
        console.log("\n=== Configuration Manager ===");
        console.log("1. View Configuration");
        console.log("2. Add/Update Configuration");
        console.log("3. Remove Configuration");
        console.log("4. Reset to Defaults");
        console.log("5. Exit");

        const choice = await this.promptUser("Enter your choice (1-5): ");
        InputValidator.validateChoice(choice, ["1", "2", "3", "4", "5"]);

        switch (choice) {
          case "1":
            await this.viewConfiguration();
            break;
          case "2":
            await this.addUpdateConfiguration();
            break;
          case "3":
            await this.removeConfiguration();
            break;
          case "4":
            await this.resetConfiguration();
            break;
          case "5":
            running = false;
            break;
        }
      } catch (error) {
        ErrorHandler.handle(error as Error, "Main Menu");
        console.log(`Error: ${(error as Error).message}`);
      }
    }
  }

  private async viewConfiguration(): Promise<void> {
    console.log("\n=== Current Configuration ===");
    const config = this.configManager.getAllConfig();

    if (config.size === 0) {
      console.log("No configuration items found");
      return;
    }

    console.log(`Total configuration items: ${config.size}`);
    config.forEach((item, key) => {
      console.log(`Key: ${key}`);
      console.log(`Value: ${item.value}`);
      console.log(`Type: ${item.type}`);
      if (item.description) {
        console.log(`Description: ${item.description}`);
      }
      console.log("---");
    });
  }

  private async addUpdateConfiguration(): Promise<void> {
    console.log("\n=== Add/Update Configuration ===");

    const key = await this.promptUser("Enter configuration key: ");
    InputValidator.validateKey(key);

    const existingItem = this.configManager.getConfig(key);

    const value = await this.promptUser("Enter configuration value: ");
    InputValidator.validateString(value, "Value");

    console.log("Select value type:");
    console.log("1. String");
    console.log("2. Number");
    console.log("3. Boolean");
    console.log("4. JSON");

    const typeChoice = await this.promptUser("Enter your choice (1-4): ");
    InputValidator.validateChoice(typeChoice, ["1", "2", "3", "4"]);

    let type: string;
    switch (typeChoice) {
      case "1":
        type = ConfigType.STRING;
        break;
      case "2":
        InputValidator.validateNumber(value);
        type = ConfigType.NUMBER;
        break;
      case "3":
        InputValidator.validateBoolean(value);
        type = ConfigType.BOOLEAN;
        break;
      case "4":
        type = ConfigType.JSON;
        break;
      default:
        throw new Error("Invalid type choice");
    }

    const description = await this.promptUser("Enter description (optional): ");

    try {
      this.configManager.setConfig(key, value, type, description);
      console.log(
        `Configuration ${existingItem ? "updated" : "added"} successfully`
      );
    } catch (error) {
      ErrorHandler.handle(error as Error, "Add/Update Configuration");
      throw error;
    }
  }

  private async removeConfiguration(): Promise<void> {
    console.log("\n=== Remove Configuration ===");
    const config = this.configManager.getAllConfig();

    if (config.size === 0) {
      console.log("No configuration items to remove");
      return;
    }

    console.log("Available configuration keys:");
    config.forEach((item, key) => {
      console.log(`- ${key}`);
    });

    const key = await this.promptUser("Enter key to remove: ");
    InputValidator.validateKey(key);

    try {
      const removed = this.configManager.removeConfig(key);
      if (removed) {
        console.log(`Configuration item '${key}' removed successfully`);
      } else {
        console.log(`Configuration item '${key}' not found`);
      }
    } catch (error) {
      ErrorHandler.handle(error as Error, "Remove Configuration");
      throw error;
    }
  }

  private async resetConfiguration(): Promise<void> {
    console.log("\n=== Reset Configuration ===");
    const confirm = await this.promptUser(
      "Are you sure you want to reset to defaults? (y/n): "
    );

    if (confirm.toLowerCase() === "y") {
      try {
        this.configManager.resetToDefaults();
        console.log("Configuration reset to defaults successfully");
      } catch (error) {
        ErrorHandler.handle(error as Error, "Reset Configuration");
        throw error;
      }
    } else {
      console.log("Reset cancelled");
    }
  }

  private promptUser(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }
}
