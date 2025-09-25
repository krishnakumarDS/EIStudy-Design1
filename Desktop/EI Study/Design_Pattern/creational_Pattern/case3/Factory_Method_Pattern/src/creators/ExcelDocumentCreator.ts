import { IDocumentCreator } from "../interfaces/IDocumentCreator";
import { IDocument } from "../interfaces/IDocument";
import { DocumentContent } from "../models/DocumentContent";
import { ExcelDocument } from "../document/ExcelDocument";
import { Logger } from "../services/Logger";

export class ExcelDocumentCreator implements IDocumentCreator {
  private logger: Logger = new Logger("ExcelDocumentCreator");

  createDocument(content: DocumentContent): IDocument {
    this.logger.info(`Creating Excel document with factory method`);
    const document = new ExcelDocument();
    document.create(content);
    return document;
  }

  getCreatorType(): string {
    return "EXCEL Creator";
  }
}
