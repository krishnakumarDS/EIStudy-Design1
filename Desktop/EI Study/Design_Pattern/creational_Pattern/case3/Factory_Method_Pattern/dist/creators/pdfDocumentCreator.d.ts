import { IDocumentCreator } from "../interfaces/IDocumentCreator";
import { IDocument } from "../interfaces/IDocument";
import { DocumentContent } from "../models/DocumentContent";
export declare class PdfDocumentCreator implements IDocumentCreator {
    private logger;
    createDocument(content: DocumentContent): IDocument;
    getCreatorType(): string;
}
//# sourceMappingURL=pdfDocumentCreator.d.ts.map