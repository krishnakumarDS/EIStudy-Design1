import { IDocument } from "../interfaces/IDocument";
import { DocumentContent } from "../models/DocumentContent";
import { Logger } from "../services/Logger";

export class PdfDocument implements IDocument {
  private content: DocumentContent | null = null;
  private logger: Logger = new Logger("PdfDocument");

  create(content: DocumentContent): void {
    this.content = content;
    this.logger.info(`Creating PDF document: ${content.title}`);
  }

  open(): void {
    if (!this.content) {
      throw new Error("Document content not set");
    }
    this.logger.info(`Opening PDF document: ${this.content.title}`);
    console.log(`Opening PDF: ${this.content.title} by ${this.content.author}`);
  }

  save(): void {
    if (!this.content) {
      throw new Error("Document content not set");
    }
    this.logger.info(`Saving PDF document: ${this.content.title}`);
    console.log(`Saving PDF: ${this.content.title} to documents/`);
  }

  print(): void {
    if (!this.content) {
      throw new Error("Document content not set");
    }
    this.logger.info(`Printing PDF document: ${this.content.title}`);
    console.log(`Printing PDF: ${this.content.title}`);
  }

  getDocumentType(): string {
    return "PDF";
  }
}
