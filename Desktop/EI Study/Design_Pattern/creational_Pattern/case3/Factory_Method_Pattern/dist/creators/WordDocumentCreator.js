"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordDocumentCreator = void 0;
const WordDocument_1 = require("../document/WordDocument");
const Logger_1 = require("../services/Logger");
class WordDocumentCreator {
    constructor() {
        this.logger = new Logger_1.Logger("WordDocumentCreator");
    }
    createDocument(content) {
        this.logger.info(`Creating Word document with factory method`);
        const document = new WordDocument_1.WordDocument();
        document.create(content);
        return document;
    }
    getCreatorType() {
        return "WORD Creator";
    }
}
exports.WordDocumentCreator = WordDocumentCreator;
//# sourceMappingURL=WordDocumentCreator.js.map