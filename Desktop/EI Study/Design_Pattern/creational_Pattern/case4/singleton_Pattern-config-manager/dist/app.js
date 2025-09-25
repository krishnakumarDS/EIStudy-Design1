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
exports.ConfigManagerApp = void 0;
const ConfigurationManager_1 = require("./ConfigurationManager");
const ConfigType_1 = require("./models/ConfigType");
const Logger_1 = require("./services/Logger");
const InputValidator_1 = require("./services/InputValidator");
const ErrorHandler_1 = require("./services/ErrorHandler");
const readline = __importStar(require("readline"));
class ConfigManagerApp {
    constructor() {
        this.configManager = ConfigurationManager_1.ConfigurationManager.getInstance();
        this.logger = Logger_1.Logger.getInstance("ConfigManagerApp");
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    async run() {
        this.logger.info("Starting Configuration Manager Application");
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
                console.log("\n=== Configuration Manager ===");
                console.log("1. View Configuration");
                console.log("2. Add/Update Configuration");
                console.log("3. Remove Configuration");
                console.log("4. Reset to Defaults");
                console.log("5. Exit");
                const choice = await this.promptUser("Enter your choice (1-5): ");
                InputValidator_1.InputValidator.validateChoice(choice, ["1", "2", "3", "4", "5"]);
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
            }
            catch (error) {
                ErrorHandler_1.ErrorHandler.handle(error, "Main Menu");
                console.log(`Error: ${error.message}`);
            }
        }
    }
    async viewConfiguration() {
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
    async addUpdateConfiguration() {
        console.log("\n=== Add/Update Configuration ===");
        const key = await this.promptUser("Enter configuration key: ");
        InputValidator_1.InputValidator.validateKey(key);
        const existingItem = this.configManager.getConfig(key);
        const value = await this.promptUser("Enter configuration value: ");
        InputValidator_1.InputValidator.validateString(value, "Value");
        console.log("Select value type:");
        console.log("1. String");
        console.log("2. Number");
        console.log("3. Boolean");
        console.log("4. JSON");
        const typeChoice = await this.promptUser("Enter your choice (1-4): ");
        InputValidator_1.InputValidator.validateChoice(typeChoice, ["1", "2", "3", "4"]);
        let type;
        switch (typeChoice) {
            case "1":
                type = ConfigType_1.ConfigType.STRING;
                break;
            case "2":
                InputValidator_1.InputValidator.validateNumber(value);
                type = ConfigType_1.ConfigType.NUMBER;
                break;
            case "3":
                InputValidator_1.InputValidator.validateBoolean(value);
                type = ConfigType_1.ConfigType.BOOLEAN;
                break;
            case "4":
                type = ConfigType_1.ConfigType.JSON;
                break;
            default:
                throw new Error("Invalid type choice");
        }
        const description = await this.promptUser("Enter description (optional): ");
        try {
            this.configManager.setConfig(key, value, type, description);
            console.log(`Configuration ${existingItem ? "updated" : "added"} successfully`);
        }
        catch (error) {
            ErrorHandler_1.ErrorHandler.handle(error, "Add/Update Configuration");
            throw error;
        }
    }
    async removeConfiguration() {
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
        InputValidator_1.InputValidator.validateKey(key);
        try {
            const removed = this.configManager.removeConfig(key);
            if (removed) {
                console.log(`Configuration item '${key}' removed successfully`);
            }
            else {
                console.log(`Configuration item '${key}' not found`);
            }
        }
        catch (error) {
            ErrorHandler_1.ErrorHandler.handle(error, "Remove Configuration");
            throw error;
        }
    }
    async resetConfiguration() {
        console.log("\n=== Reset Configuration ===");
        const confirm = await this.promptUser("Are you sure you want to reset to defaults? (y/n): ");
        if (confirm.toLowerCase() === "y") {
            try {
                this.configManager.resetToDefaults();
                console.log("Configuration reset to defaults successfully");
            }
            catch (error) {
                ErrorHandler_1.ErrorHandler.handle(error, "Reset Configuration");
                throw error;
            }
        }
        else {
            console.log("Reset cancelled");
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
exports.ConfigManagerApp = ConfigManagerApp;
//# sourceMappingURL=app.js.map