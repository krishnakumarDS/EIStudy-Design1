import { PdfDocumentCreator } from "./creators/pdfDocumentCreator";
import { WordDocumentCreator } from "./creators/WordDocumentCreator";
import { ExcelDocumentCreator } from "./creators/ExcelDocumentCreator";
import { DocumentContent } from "./models/DocumentContent";
import { Logger } from "./services/Logger";
import { InputValidator } from "./services/InputValidator";
import { ErrorHandler } from "./services/ErrorHandler";
import * as readline from "readline";
import { IDocumentCreator } from "./interfaces/IDocumentCreator";

export class DocumentCreatorApp {
  private logger: Logger;
  private rl: readline.Interface;

  constructor() {
    this.logger = new Logger("DocumentCreatorApp");
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async run(): Promise<void> {
    this.logger.info("Starting Document Creator Application");

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
        console.log("\n=== Document Creator System ===");
        console.log("1. Create Document");
        console.log("2. Exit");

        const choice = await this.promptUser("Enter your choice (1-2): ");
        InputValidator.validateChoice(choice, ["1", "2"]);

        switch (choice) {
          case "1":
            await this.createDocument();
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

  private async createDocument(): Promise<void> {
    console.log("\n=== Create Document ===");
    console.log("Select document type:");
    console.log("1. PDF");
    console.log("2. Word");
    console.log("3. Excel");

    const typeChoice = await this.promptUser("Enter your choice (1-3): ");
    InputValidator.validateChoice(typeChoice, ["1", "2", "3"]);

    const title = await this.promptUser("Enter document title: ");
    InputValidator.validateString(title, "Title");
    InputValidator.validateMaxLength(title, 50, "Title");

    const body = await this.promptUser("Enter document body: ");
    InputValidator.validateString(body, "Body");
    InputValidator.validateMaxLength(body, 200, "Body");

    const author = await this.promptUser("Enter author name (optional): ");

    const content = new DocumentContent(title, body, author || "Anonymous");

    let creator: IDocumentCreator | undefined;

    try {
      switch (typeChoice) {
        case "1":
          creator = new PdfDocumentCreator();
          break;
        case "2":
          creator = new WordDocumentCreator();
          break;
        case "3":
          creator = new ExcelDocumentCreator();
          break;
        default:
          throw new Error("Invalid document type selected.");
      }

      if (!creator) {
        throw new Error("Document creator could not be initialized.");
      }

      const document = creator.createDocument(content);
      console.log(
        `\nDocument created successfully using ${creator.getCreatorType()}`
      );
      console.log(`Document type: ${document.getDocumentType()}`);

      await this.performDocumentActions(document);
    } catch (error) {
      ErrorHandler.handle(error as Error, "Create Document");
      throw error;
    }
  }

  private async performDocumentActions(document: any): Promise<void> {
    let performingActions = true;

    while (performingActions) {
      try {
        console.log("\n=== Document Actions ===");
        console.log("1. Open Document");
        console.log("2. Save Document");
        console.log("3. Print Document");
        console.log("4. Back to Main Menu");

        const actionChoice = await this.promptUser("Enter your choice (1-4): ");
        InputValidator.validateChoice(actionChoice, ["1", "2", "3", "4"]);

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
      } catch (error) {
        ErrorHandler.handle(error as Error, "Document Actions");
        console.log(`Error: ${(error as Error).message}`);
      }
    }
  }

  private promptUser(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, (answer: string) => {
        resolve(answer);
      });
    });
  }
}
