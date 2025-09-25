import { IDocumentCreator } from "../interfaces/IDocumentCreator";
import { IDocument } from "../interfaces/IDocument";
import { DocumentContent } from "../models/DocumentContent";
export declare class WordDocumentCreator implements IDocumentCreator {
    private logger;
    createDocument(content: DocumentContent): IDocument;
    getCreatorType(): string;
}
//# sourceMappingURL=WordDocumentCreator.d.ts.map