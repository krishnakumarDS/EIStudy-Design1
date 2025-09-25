import { DocumentContent } from "../models/DocumentContent";

export interface IDocument {
  create(content: DocumentContent): void;
  open(): void;
  save(): void;
  print(): void;
  getDocumentType(): string;
}
