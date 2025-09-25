"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordDocument = void 0;
const Logger_1 = require("../services/Logger");
class WordDocument {
    constructor() {
        this.content = null;
        this.logger = new Logger_1.Logger("WordDocument");
    }
    create(content) {
        this.content = content;
        this.logger.info(`Creating Word document: ${content.title}`);
    }
    open() {
        if (!this.content) {
            throw new Error("Document content not set");
        }
        this.logger.info(`Opening Word document: ${this.content.title}`);
        console.log(`Opening Word: ${this.content.title} by ${this.content.author}`);
    }
    save() {
        if (!this.content) {
            throw new Error("Document content not set");
        }
        this.logger.info(`Saving Word document: ${this.content.title}`);
        console.log(`Saving Word: ${this.content.title} to documents/`);
    }
    print() {
        if (!this.content) {
            throw new Error("Document content not set");
        }
        this.logger.info(`Printing Word document: ${this.content.title}`);
        console.log(`Printing Word: ${this.content.title}`);
    }
    getDocumentType() {
        return "WORD";
    }
}
exports.WordDocument = WordDocument;
//# sourceMappingURL=WordDocument.js.map