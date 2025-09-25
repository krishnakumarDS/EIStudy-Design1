"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelDocumentCreator = void 0;
const ExcelDocument_1 = require("../document/ExcelDocument");
const Logger_1 = require("../services/Logger");
class ExcelDocumentCreator {
    constructor() {
        this.logger = new Logger_1.Logger("ExcelDocumentCreator");
    }
    createDocument(content) {
        this.logger.info(`Creating Excel document with factory method`);
        const document = new ExcelDocument_1.ExcelDocument();
        document.create(content);
        return document;
    }
    getCreatorType() {
        return "EXCEL Creator";
    }
}
exports.ExcelDocumentCreator = ExcelDocumentCreator;
//# sourceMappingURL=ExcelDocumentCreator.js.map