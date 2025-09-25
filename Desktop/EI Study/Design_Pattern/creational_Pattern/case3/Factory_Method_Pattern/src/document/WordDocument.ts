import { IDocument } from "../interfaces/IDocument";
import { DocumentContent } from "../models/DocumentContent";
import { Logger } from "../services/Logger";

export class WordDocument implements IDocument {
  private content: DocumentContent | null = null;
  private logger: Logger = new Logger("WordDocument");

  create(content: DocumentContent): void {
    this.content = content;
    this.logger.info(`Creating Word document: ${content.title}`);
  }

  open(): void {
    if (!this.content) {
      throw new Error("Document content not set");
    }
    this.logger.info(`Opening Word document: ${this.content.title}`);
    console.log(
      `Opening Word: ${this.content.title} by ${this.content.author}`
    );
  }

  save(): void {
    if (!this.content) {
      throw new Error("Document content not set");
    }
    this.logger.info(`Saving Word document: ${this.content.title}`);
    console.log(`Saving Word: ${this.content.title} to documents/`);
  }

  print(): void {
    if (!this.content) {
      throw new Error("Document content not set");
    }
    this.logger.info(`Printing Word document: ${this.content.title}`);
    console.log(`Printing Word: ${this.content.title}`);
  }

  getDocumentType(): string {
    return "WORD";
  }
}
