"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfDocumentCreator = void 0;
const pdfDocument_1 = require("../document/pdfDocument");
const Logger_1 = require("../services/Logger");
class PdfDocumentCreator {
    constructor() {
        this.logger = new Logger_1.Logger("PdfDocumentCreator");
    }
    createDocument(content) {
        this.logger.info(`Creating PDF document with factory method`);
        const document = new pdfDocument_1.PdfDocument();
        document.create(content);
        return document;
    }
    getCreatorType() {
        return "PDF Creator";
    }
}
exports.PdfDocumentCreator = PdfDocumentCreator;
//# sourceMappingURL=pdfDocumentCreator.js.map