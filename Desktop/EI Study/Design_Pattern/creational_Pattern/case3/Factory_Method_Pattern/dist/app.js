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
exports.DocumentCreatorApp = void 0;
const pdfDocumentCreator_1 = require("./creators/pdfDocumentCreator");
const WordDocumentCreator_1 = require("./creators/WordDocumentCreator");
const ExcelDocumentCreator_1 = require("./creators/ExcelDocumentCreator");
const DocumentContent_1 = require("./models/DocumentContent");
const Logger_1 = require("./services/Logger");
const InputValidator_1 = require("./services/InputValidator");
const ErrorHandler_1 = require("./services/ErrorHandler");
const readline = __importStar(require("readline"));
class DocumentCreatorApp {
    constructor() {
        this.logger = new Logger_1.Logger("DocumentCreatorApp");
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    async run() {
        this.logger.info("Starting Document Creator Application");
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
                console.log("\n=== Document Creator System ===");
                console.log("1. Create Document");
                console.log("2. Exit");
                const choice = await this.promptUser("Enter your choice (1-2): ");
                InputValidator_1.InputValidator.validateChoice(choice, ["1", "2"]);
                switch (choice) {
                    case "1":
                        await this.createDocument();
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
    async createDocument() {
        console.log("\n=== Create Document ===");
        console.log("Select document type:");
        console.log("1. PDF");
        console.log("2. Word");
        console.log("3. Excel");
        const typeChoice = await this.promptUser("Enter your choice (1-3): ");
        InputValidator_1.InputValidator.validateChoice(typeChoice, ["1", "2", "3"]);
        const title = await this.promptUser("Enter document title: ");
        InputValidator_1.InputValidator.validateString(title, "Title");
        InputValidator_1.InputValidator.validateMaxLength(title, 50, "Title");
        const body = await this.promptUser("Enter document body: ");
        InputValidator_1.InputValidator.validateString(body, "Body");
        InputValidator_1.InputValidator.validateMaxLength(body, 200, "Body");
        const author = await this.promptUser("Enter author name (optional): ");
        const content = new DocumentContent_1.DocumentContent(title, body, author || "Anonymous");
        let creator;
        try {
            switch (typeChoice) {
                case "1":
                    creator = new pdfDocumentCreator_1.PdfDocumentCreator();
                    break;
                case "2":
                    creator = new WordDocumentCreator_1.WordDocumentCreator();
                    break;
                case "3":
                    creator = new ExcelDocumentCreator_1.ExcelDocumentCreator();
                    break;
                default:
                    throw new Error("Invalid document type selected.");
            }
            if (!creator) {
                throw new Error("Document creator could not be initialized.");
            }
            const document = creator.createDocument(content);
            console.log(`\nDocument created successfully using ${creator.getCreatorType()}`);
            console.log(`Document type: ${document.getDocumentType()}`);
            await this.performDocumentActions(document);
        }
        catch (error) {
            ErrorHandler_1.ErrorHandler.handle(error, "Create Document");
            throw error;
        }
    }
    async performDocumentActions(document) {
        let performingActions = true;
        while (performingActions) {
            try {
                console.log("\n=== Document Actions ===");
                console.log("1. Open Document");
                console.log("2. Save Document");
                console.log("3. Print Document");
                console.log("4. Back to Main Menu");
                const actionChoice = await this.promptUser("Enter your choice (1-4): ");
                InputValidator_1.InputValidator.validateChoice(actionChoice, ["1", "2", "3", "4"]);
                switch (actionChoice) {
                    case "1":
                        document.open();
                        break;
                    case "2":
                        document.save();
                        break;
                    case "3":
                        document.print();
                        break;
                    case "4":
                        performingActions = false;
                        break;
                }
            }
            catch (error) {
                ErrorHandler_1.ErrorHandler.handle(error, "Document Actions");
                console.log(`Error: ${error.message}`);
            }
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
exports.DocumentCreatorApp = DocumentCreatorApp;
//# sourceMappingURL=app.js.map