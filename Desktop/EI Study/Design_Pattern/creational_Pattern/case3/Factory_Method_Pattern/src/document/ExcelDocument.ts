import { IDocument } from "../interfaces/IDocument";
import { DocumentContent } from "../models/DocumentContent";
import { Logger } from "../services/Logger";

export class ExcelDocument implements IDocument {
  private content: DocumentContent | null = null;
  private logger: Logger = new Logger("ExcelDocument");

  create(content: DocumentContent): void {
    this.content = content;
    this.logger.info(`Creating Excel document: ${content.title}`);
  }

  open(): void {
    if (!this.content) {
      throw new Error("Document content not set");
    }
    this.logger.info(`Opening Excel document: ${this.content.title}`);
    console.log(
      `Opening Excel: ${this.content.title} by ${this.content.author}`
    );
  }

  save(): void {
    if (!this.content) {
      throw new Error("Document content not set");
    }
    this.logger.info(`Saving Excel document: ${this.content.title}`);
    console.log(`Saving Excel: ${this.content.title} to documents/`);
  }

  print(): void {
    if (!this.content) {
      throw new Error("Document content not set");
    }
    this.logger.info(`Printing Excel document: ${this.content.title}`);
    console.log(`Printing Excel: ${this.content.title}`);
  }

  getDocumentType(): string {
    return "EXCEL";
  }
}
