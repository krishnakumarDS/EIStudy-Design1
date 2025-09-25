"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelDocument = void 0;
const Logger_1 = require("../services/Logger");
class ExcelDocument {
    constructor() {
        this.content = null;
        this.logger = new Logger_1.Logger("ExcelDocument");
    }
    create(content) {
        this.content = content;
        this.logger.info(`Creating Excel document: ${content.title}`);
    }
    open() {
        if (!this.content) {
            throw new Error("Document content not set");
        }
        this.logger.info(`Opening Excel document: ${this.content.title}`);
        console.log(`Opening Excel: ${this.content.title} by ${this.content.author}`);
    }
    save() {
        if (!this.content) {
            throw new Error("Document content not set");
        }
        this.logger.info(`Saving Excel document: ${this.content.title}`);
        console.log(`Saving Excel: ${this.content.title} to documents/`);
    }
    print() {
        if (!this.content) {
            throw new Error("Document content not set");
        }
        this.logger.info(`Printing Excel document: ${this.content.title}`);
        console.log(`Printing Excel: ${this.content.title}`);
    }
    getDocumentType() {
        return "EXCEL";
    }
}
exports.ExcelDocument = ExcelDocument;
//# sourceMappingURL=ExcelDocument.js.map