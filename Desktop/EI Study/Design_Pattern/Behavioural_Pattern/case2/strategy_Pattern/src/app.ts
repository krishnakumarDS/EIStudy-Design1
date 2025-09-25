import { TextFormatterContext } from "./TextFormatterContext";
import { UpperCaseFormatter } from "./strategies/UpperCaseFormatter";
import { LowerCaseFormatter } from "./strategies/LowerCaseFormatter";
import { CapitalizeFormatter } from "./strategies/CaptializeFormatter";
import { ReverseFormatter } from "./strategies/ReverseFormatter";
import { Logger } from "./services/Logger";
import { InputValidator } from "./services/InputValidator";
import { ErrorHandler } from "./services/ErrorHandling";
import * as readline from "readline";

export class TextFormatterApp {
  private context: TextFormatterContext;
  private logger: Logger;
  private rl: readline.Interface;

  constructor() {
    this.context = new TextFormatterContext(new UpperCaseFormatter());
    this.logger = new Logger("TextFormatterApp");
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async run(): Promise<void> {
    this.logger.info("Starting Text Formatter Application");

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
        console.log("\n=== Text Formatter ===");
        console.log(
          `Current formatter: ${this.context.getCurrentFormatterName()}`
        );
        console.log("1. Format Text");
        console.log("2. Change Formatter");
        console.log("3. Exit");

        const choice = await this.promptUser("Enter your choice (1-3): ");
        InputValidator.validateChoice(choice, ["1", "2", "3"]);

        switch (choice) {
          case "1":
            await this.formatText();
            break;
          case "2":
            await this.changeFormatter();
            break;
          case "3":
            running = false;
            break;
        }
      } catch (error) {
        ErrorHandler.handle(error as Error, "Main Menu");
        console.log(`Error: ${(error as Error).message}`);
      }
    }
  }

  private async formatText(): Promise<void> {
    console.log("\n=== Format Text ===");
    const text = await this.promptUser("Enter text to format: ");
    InputValidator.validateString(text, "Text");
    InputValidator.validateMaxLength(text, 100, "Text");

    try {
      const formattedText = this.context.formatText(text);
      console.log("\nFormatted text:");
      console.log(formattedText);
    } catch (error) {
      ErrorHandler.handle(error as Error, "Format Text");
      throw error;
    }
  }

  private async changeFormatter(): Promise<void> {
    console.log("\n=== Change Formatter ===");
    console.log("Available formatters:");
    console.log("1. Uppercase");
    console.log("2. Lowercase");
    console.log("3. Capitalize");
    console.log("4. Reverse");

    const choice = await this.promptUser("Enter your choice (1-4): ");
    InputValidator.validateChoice(choice, ["1", "2", "3", "4"]);

    try {
      switch (choice) {
        case "1":
          this.context.setFormatter(new UpperCaseFormatter());
          break;
        case "2":
          this.context.setFormatter(new LowerCaseFormatter());
          break;
        case "3":
          this.context.setFormatter(new CapitalizeFormatter());
          break;
        case "4":
          this.context.setFormatter(new ReverseFormatter());
          break;
      }
      console.log(
        `Formatter changed to ${this.context.getCurrentFormatterName()}`
      );
    } catch (error) {
      ErrorHandler.handle(error as Error, "Change Formatter");
      throw error;
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
