import { IDocumentCreator } from "../interfaces/IDocumentCreator";
import { IDocument } from "../interfaces/IDocument";
import { DocumentContent } from "../models/DocumentContent";
import { WordDocument } from "../document/WordDocument";
import { Logger } from "../services/Logger";

export class WordDocumentCreator implements IDocumentCreator {
  private logger: Logger = new Logger("WordDocumentCreator");

  createDocument(content: DocumentContent): IDocument {
    this.logger.info(`Creating Word document with factory method`);
    const document = new WordDocument();
    document.create(content);
    return document;
  }

  getCreatorType(): string {
    return "WORD Creator";
  }
}
