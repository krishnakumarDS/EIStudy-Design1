import { IDocument } from "./IDocument";
import { DocumentContent } from "../models/DocumentContent";

export interface IDocumentCreator {
  createDocument(content: DocumentContent): IDocument;
  getCreatorType(): string;
}
