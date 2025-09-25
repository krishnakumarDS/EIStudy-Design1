import { IDocumentCreator } from "../interfaces/IDocumentCreator";
import { IDocument } from "../interfaces/IDocument";
import { DocumentContent } from "../models/DocumentContent";
import { PdfDocument } from "../document/pdfDocument";
import { Logger } from "../services/Logger";

export class PdfDocumentCreator implements IDocumentCreator {
  private logger: Logger = new Logger("PdfDocumentCreator");

  createDocument(content: DocumentContent): IDocument {
    this.logger.info(`Creating PDF document with factory method`);
    const document = new PdfDocument();
    document.create(content);
    return document;
  }

  getCreatorType(): string {
    return "PDF Creator";
  }
}
