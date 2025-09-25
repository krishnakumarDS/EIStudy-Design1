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
exports.TextFormatterApp = void 0;
const TextFormatterContext_1 = require("./TextFormatterContext");
const UpperCaseFormatter_1 = require("./strategies/UpperCaseFormatter");
const LowerCaseFormatter_1 = require("./strategies/LowerCaseFormatter");
const CaptializeFormatter_1 = require("./strategies/CaptializeFormatter");
const ReverseFormatter_1 = require("./strategies/ReverseFormatter");
const Logger_1 = require("./services/Logger");
const InputValidator_1 = require("./services/InputValidator");
const ErrorHandling_1 = require("./services/ErrorHandling");
const readline = __importStar(require("readline"));
class TextFormatterApp {
    constructor() {
        this.context = new TextFormatterContext_1.TextFormatterContext(new UpperCaseFormatter_1.UpperCaseFormatter());
        this.logger = new Logger_1.Logger("TextFormatterApp");
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    async run() {
        this.logger.info("Starting Text Formatter Application");
        try {
            await this.showMainMenu();
        }
        catch (error) {
            ErrorHandling_1.ErrorHandler.handle(error, "Main Application Loop");
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
                console.log("\n=== Text Formatter ===");
                console.log(`Current formatter: ${this.context.getCurrentFormatterName()}`);
                console.log("1. Format Text");
                console.log("2. Change Formatter");
                console.log("3. Exit");
                const choice = await this.promptUser("Enter your choice (1-3): ");
                InputValidator_1.InputValidator.validateChoice(choice, ["1", "2", "3"]);
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
            }
            catch (error) {
                ErrorHandling_1.ErrorHandler.handle(error, "Main Menu");
                console.log(`Error: ${error.message}`);
            }
        }
    }
    async formatText() {
        console.log("\n=== Format Text ===");
        const text = await this.promptUser("Enter text to format: ");
        InputValidator_1.InputValidator.validateString(text, "Text");
        InputValidator_1.InputValidator.validateMaxLength(text, 100, "Text");
        try {
            const formattedText = this.context.formatText(text);
            console.log("\nFormatted text:");
            console.log(formattedText);
        }
        catch (error) {
            ErrorHandling_1.ErrorHandler.handle(error, "Format Text");
            throw error;
        }
    }
    async changeFormatter() {
        console.log("\n=== Change Formatter ===");
        console.log("Available formatters:");
        console.log("1. Uppercase");
        console.log("2. Lowercase");
        console.log("3. Capitalize");
        console.log("4. Reverse");
        const choice = await this.promptUser("Enter your choice (1-4): ");
        InputValidator_1.InputValidator.validateChoice(choice, ["1", "2", "3", "4"]);
        try {
            switch (choice) {
                case "1":
                    this.context.setFormatter(new UpperCaseFormatter_1.UpperCaseFormatter());
                    break;
                case "2":
                    this.context.setFormatter(new LowerCaseFormatter_1.LowerCaseFormatter());
                    break;
                case "3":
                    this.context.setFormatter(new CaptializeFormatter_1.CapitalizeFormatter());
                    break;
                case "4":
                    this.context.setFormatter(new ReverseFormatter_1.ReverseFormatter());
                    break;
            }
            console.log(`Formatter changed to ${this.context.getCurrentFormatterName()}`);
        }
        catch (error) {
            ErrorHandling_1.ErrorHandler.handle(error, "Change Formatter");
            throw error;
        }
    }
    promptUser(question) {
        return new Promise((resolve) => {
            this.rl.question(question, (answer) => {
                resolve(answer);
            });
        });
    }
}
exports.TextFormatterApp = TextFormatterApp;
//# sourceMappingURL=app.js.map