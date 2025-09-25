import { IDocument } from "../interfaces/IDocument";
import { DocumentContent } from "../models/DocumentContent";
export declare class ExcelDocument implements IDocument {
    private content;
    private logger;
    create(content: DocumentContent): void;
    open(): void;
    save(): void;
    print(): void;
    getDocumentType(): string;
}
//# sourceMappingURL=ExcelDocument.d.ts.map