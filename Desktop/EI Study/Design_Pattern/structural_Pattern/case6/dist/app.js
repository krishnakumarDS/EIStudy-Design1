"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeeOrderingApp = void 0;
const SimpleCoffee_1 = require("./components/SimpleCoffee");
const MilkDecorator_1 = require("./decorators/MilkDecorator");
const SugarDecorator_1 = require("./decorators/SugarDecorator");
const WhipDecorator_1 = require("./decorators/WhipDecorator");
const CaramelDecorator_1 = require("./decorators/CaramelDecorator");
const Logger_1 = require("./services/Logger");
const InputValidator_1 = require("./services/InputValidator");
const ErrorHandler_1 = require("./services/ErrorHandler");
const readline = __importStar(require("readline"));
class CoffeeOrderingApp {
    constructor() {
        this.logger = new Logger_1.Logger("CoffeeOrderingApp");
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    async run() {
        this.logger.info("Starting Coffee Ordering Application");
        try {
            await this.showMainMenu();
        }
        catch (error) {
            ErrorHandler_1.ErrorHandler.handle(error, "Main Application Loop");
        }
        finally {
            this.rl.close();
            this.logger.info("Application terminated");
        }
    }
    async showMainMenu() {
        let running = true;
        while (running) {
            try {
                console.log("\n=== Coffee Ordering System ===");
                console.log("1. Order Coffee");
                console.log("2. Exit");
                const choice = await this.promptUser("Enter your choice (1-2): ");
                InputValidator_1.InputValidator.validateChoice(choice, ["1", "2"]);
                switch (choice) {
                    case "1":
                        await this.orderCoffee();
                        break;
                    case "2":
                        running = false;
                        break;
                }
            }
            catch (error) {
                ErrorHandler_1.ErrorHandler.handle(error, "Main Menu");
                console.log(`Error: ${error.message}`);
            }
        }
    }
    async orderCoffee() {
        console.log("\n=== Order Coffee ===");
        // Start with a simple coffee
        let coffee = new SimpleCoffee_1.SimpleCoffee();
        console.log(`Base coffee: ${coffee.getDescription()} - $${coffee
            .getCost()
            .toFixed(2)}`);
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
                InputValidator_1.InputValidator.validateChoice(choice, ["1", "2", "3", "4", "5"]);
                switch (choice) {
                    case "1":
                        coffee = new MilkDecorator_1.MilkDecorator(coffee);
                        console.log(`Added Milk: ${coffee.getDescription()} - $${coffee
                            .getCost()
                            .toFixed(2)}`);
                        break;
                    case "2":
                        coffee = new SugarDecorator_1.SugarDecorator(coffee);
                        console.log(`Added Sugar: ${coffee.getDescription()} - $${coffee
                            .getCost()
                            .toFixed(2)}`);
                        break;
                    case "3":
                        coffee = new WhipDecorator_1.WhipDecorator(coffee);
                        console.log(`Added Whip: ${coffee.getDescription()} - $${coffee
                            .getCost()
                            .toFixed(2)}`);
                        break;
                    case "4":
                        coffee = new CaramelDecorator_1.CaramelDecorator(coffee);
                        console.log(`Added Caramel: ${coffee.getDescription()} - $${coffee
                            .getCost()
                            .toFixed(2)}`);
                        break;
                    case "5":
                        addingCondiments = false;
                        break;
                }
            }
            catch (error) {
                ErrorHandler_1.ErrorHandler.handle(error, "Add Condiments");
                console.log(`Error: ${error.message}`);
            }
        }
        // Display final order
        console.log("\n=== Final Order ===");
        console.log(`Description: ${coffee.getDescription()}`);
        console.log(`Total Cost: $${coffee.getCost().toFixed(2)}`);
        await this.promptUser("\nPress Enter to continue...");
    }
    promptUser(question) {
        return new Promise((resolve) => {
            this.rl.question(question, (answer) => {
                resolve(answer);
            });
        });
    }
}
exports.CoffeeOrderingApp = CoffeeOrderingApp;
//# sourceMappingURL=app.js.map