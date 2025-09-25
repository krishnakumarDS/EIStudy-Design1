"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfDocument = void 0;
const Logger_1 = require("../services/Logger");
class PdfDocument {
    constructor() {
        this.content = null;
        this.logger = new Logger_1.Logger("PdfDocument");
    }
    create(content) {
        this.content = content;
        this.logger.info(`Creating PDF document: ${content.title}`);
    }
    open() {
        if (!this.content) {
            throw new Error("Document content not set");
        }
        this.logger.info(`Opening PDF document: ${this.content.title}`);
        console.log(`Opening PDF: ${this.content.title} by ${this.content.author}`);
    }
    save() {
        if (!this.content) {
            throw new Error("Document content not set");
        }
        this.logger.info(`Saving PDF document: ${this.content.title}`);
        console.log(`Saving PDF: ${this.content.title} to documents/`);
    }
    print() {
        if (!this.content) {
            throw new Error("Document content not set");
        }
        this.logger.info(`Printing PDF document: ${this.content.title}`);
        console.log(`Printing PDF: ${this.content.title}`);
    }
    getDocumentType() {
        return "PDF";
    }
}
exports.PdfDocument = PdfDocument;
//# sourceMappingURL=pdfDocument.js.map