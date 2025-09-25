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
const newsPublisher_1 = require("./newsPublisher");
const EmailSubscriber_1 = require("./subscribers/EmailSubscriber");
const SMSSubscriber_1 = require("./subscribers/SMSSubscriber");
const PushNotificationSubscriber_1 = require("./subscribers/PushNotificationSubscriber");
const Logger_1 = require("./services/Logger");
const InputValidator_1 = require("./services/InputValidator");
const ErrorHandling_1 = require("./services/ErrorHandling");
const readline = __importStar(require("readline"));
class NewsApplication {
    constructor() {
        this.publisher = new newsPublisher_1.NewsPublisher();
        this.logger = new Logger_1.Logger("NewsApplication");
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    async run() {
        this.logger.info("Starting News Application");
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
                console.log("\n=== News Publisher System ===");
                console.log("1. Publish News");
                console.log("2. Add Subscriber");
                console.log("3. Remove Subscriber");
                console.log("4. List Subscribers");
                console.log("5. View News History");
                console.log("6. Exit");
                const choice = await this.promptUser("Enter your choice (1-6): ");
                InputValidator_1.InputValidator.validateChoice(choice, ["1", "2", "3", "4", "5", "6"]);
                switch (choice) {
                    case "1":
                        await this.publishNews();
                        break;
                    case "2":
                        await this.addSubscriber();
                        break;
                    case "3":
                        await this.removeSubscriber();
                        break;
                    case "4":
                        await this.listSubscribers();
                        break;
                    case "5":
                        await this.viewNewsHistory();
                        break;
                    case "6":
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
    async publishNews() {
        console.log("\n=== Publish News ===");
        const title = await this.promptUser("Enter news title: ");
        InputValidator_1.InputValidator.validateString(title, "Title");
        const content = await this.promptUser("Enter news content: ");
        InputValidator_1.InputValidator.validateString(content, "Content");
        try {
            this.publisher.publishNews(title, content);
            console.log("News published successfully!");
        }
        catch (error) {
            ErrorHandling_1.ErrorHandler.handle(error, "Publish News");
            throw error;
        }
    }
    async addSubscriber() {
        console.log("\n=== Add Subscriber ===");
        console.log("Select subscriber type:");
        console.log("1. Email");
        console.log("2. SMS");
        console.log("3. Push Notification");
        const typeChoice = await this.promptUser("Enter your choice (1-3): ");
        InputValidator_1.InputValidator.validateChoice(typeChoice, ["1", "2", "3"]);
        const name = await this.promptUser("Enter subscriber name: ");
        InputValidator_1.InputValidator.validateString(name, "Name");
        let subscriber;
        try {
            switch (typeChoice) {
                case "1":
                    const email = await this.promptUser("Enter email address: ");
                    InputValidator_1.InputValidator.validateEmail(email);
                    subscriber = new EmailSubscriber_1.EmailSubscriber(name, email);
                    break;
                case "2":
                    const phone = await this.promptUser("Enter phone number: ");
                    InputValidator_1.InputValidator.validatePhone(phone);
                    subscriber = new SMSSubscriber_1.SMSSubscriber(name, phone);
                    break;
                case "3":
                    const deviceId = await this.promptUser("Enter device ID: ");
                    InputValidator_1.InputValidator.validateString(deviceId, "Device ID");
                    subscriber = new PushNotificationSubscriber_1.PushNotificationSubscriber(name, deviceId);
                    break;
            }
            if (subscriber) {
                this.publisher.attach(subscriber);
                console.log("Subscriber added successfully!");
            }
            else {
                throw new Error("Failed to create subscriber. Invalid type selected.");
            }
        }
        catch (error) {
            ErrorHandling_1.ErrorHandler.handle(error, "Add Subscriber");
            throw error;
        }
    }
    async removeSubscriber() {
        console.log("\n=== Remove Subscriber ===");
        const subscribers = this.publisher.getObservers();
        if (subscribers.length === 0) {
            console.log("No subscribers to remove.");
            return;
        }
        console.log("Current subscribers:");
        subscribers.forEach((sub) => {
            console.log(`${sub.id}: ${sub.name} (${sub.getSubscriberType()}) - ${sub.getContactInfo()}`);
        });
        const subscriberId = await this.promptUser("Enter subscriber ID to remove: ");
        InputValidator_1.InputValidator.validateSubscriberId(subscriberId);
        try {
            const observer = subscribers.find((sub) => sub.id === subscriberId);
            if (!observer) {
                throw new Error("Subscriber not found.");
            }
            this.publisher.detach(observer);
            console.log("Subscriber removed successfully!");
        }
        catch (error) {
            ErrorHandling_1.ErrorHandler.handle(error, "Remove Subscriber");
            throw error;
        }
    }
    async listSubscribers() {
        console.log("\n=== List Subscribers ===");
        const subscribers = this.publisher.getObservers();
        if (subscribers.length === 0) {
            console.log("No subscribers found.");
            return;
        }
        console.log(`Total subscribers: ${subscribers.length}`);
        subscribers.forEach((sub) => {
            console.log(`ID: ${sub.id}`);
            console.log(`Name: ${sub.name}`);
            console.log(`Type: ${sub.getSubscriberType()}`);
            console.log(`Contact: ${sub.getContactInfo()}`);
            console.log("---");
        });
    }
    async viewNewsHistory() {
        console.log("\n=== News History ===");
        const newsHistory = this.publisher.getNewsHistory();
        if (newsHistory.length === 0) {
            console.log("No news published yet.");
            return;
        }
        console.log(`Total news items: ${newsHistory.length}`);
        newsHistory.forEach((news) => {
            console.log(`ID: ${news.id}`);
            console.log(`Title: ${news.title}`);
            console.log(`Content: ${news.content}`);
            console.log(`Published: ${news.timestamp.toISOString()}`);
            console.log("---");
        });
    }
    promptUser(question) {
        return new Promise((resolve) => {
            this.rl.question(question, (answer) => {
                resolve(answer);
            });
        });
    }
}
// Start the application
const app = new NewsApplication();
app.run().catch((error) => {
    console.error("Application crashed:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map