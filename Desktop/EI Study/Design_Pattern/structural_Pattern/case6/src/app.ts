import { ICoffee } from "./interfaces/ICoffee";
import { SimpleCoffee } from "./components/SimpleCoffee";
import { MilkDecorator } from "./decorators/MilkDecorator";
import { SugarDecorator } from "./decorators/SugarDecorator";
import { WhipDecorator } from "./decorators/WhipDecorator";
import { CaramelDecorator } from "./decorators/CaramelDecorator";
import { Logger } from "./services/Logger";
import { InputValidator } from "./services/InputValidator";
import { ErrorHandler } from "./services/ErrorHandler";
import * as readline from "readline";

export class CoffeeOrderingApp {
  private logger: Logger;
  private rl: readline.Interface;

  constructor() {
    this.logger = new Logger("CoffeeOrderingApp");
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async run(): Promise<void> {
    this.logger.info("Starting Coffee Ordering Application");

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
        console.log("\n=== Coffee Ordering System ===");
        console.log("1. Order Coffee");
        console.log("2. Exit");

        const choice = await this.promptUser("Enter your choice (1-2): ");
        InputValidator.validateChoice(choice, ["1", "2"]);

        switch (choice) {
          case "1":
            await this.orderCoffee();
            break;
          case "2":
            running = false;
            break;
        }
      } catch (error) {
        ErrorHandler.handle(error as Error, "Main Menu");
        console.log(`Error: ${(error as Error).message}`);
      }
    }
  }

  private async orderCoffee(): Promise<void> {
    console.log("\n=== Order Coffee ===");

    // Start with a simple coffee
    let coffee: ICoffee = new SimpleCoffee();
    console.log(
      `Base coffee: ${coffee.getDescription()} - $${coffee
        .getCost()
        .toFixed(2)}`
    );

    let addingCondiments = true;

    while (addingCondiments) {
      try {
        console.log("\nAdd condiments:");
        console.log("1. Milk (+$1.50)");
        console.log("2. Sugar (+$0.50)");
        console.log("3. Whip (+$2.00)");
        console.log("4. Caramel (+$2.50)");
        console.log("5. Finish Order");

        const choice = await this.promptUser("Enter your choice (1-5): ");
        InputValidator.validateChoice(choice, ["1", "2", "3", "4", "5"]);

        switch (choice) {
          case "1":
            coffee = new MilkDecorator(coffee);
            console.log(
              `Added Milk: ${coffee.getDescription()} - $${coffee
                .getCost()
                .toFixed(2)}`
            );
            break;
          case "2":
            coffee = new SugarDecorator(coffee);
            console.log(
              `Added Sugar: ${coffee.getDescription()} - $${coffee
                .getCost()
                .toFixed(2)}`
            );
            break;
          case "3":
            coffee = new WhipDecorator(coffee);
            console.log(
              `Added Whip: ${coffee.getDescription()} - $${coffee
                .getCost()
                .toFixed(2)}`
            );
            break;
          case "4":
            coffee = new CaramelDecorator(coffee);
            console.log(
              `Added Caramel: ${coffee.getDescription()} - $${coffee
                .getCost()
                .toFixed(2)}`
            );
            break;
          case "5":
            addingCondiments = false;
            break;
        }
      } catch (error) {
        ErrorHandler.handle(error as Error, "Add Condiments");
        console.log(`Error: ${(error as Error).message}`);
      }
    }

    // Display final order
    console.log("\n=== Final Order ===");
    console.log(`Description: ${coffee.getDescription()}`);
    console.log(`Total Cost: $${coffee.getCost().toFixed(2)}`);

    await this.promptUser("\nPress Enter to continue...");
  }

  private promptUser(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }
}
