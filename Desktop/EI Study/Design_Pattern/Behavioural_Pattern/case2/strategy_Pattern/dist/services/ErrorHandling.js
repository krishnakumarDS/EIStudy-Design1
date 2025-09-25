"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const Logger_1 = require("./Logger");
class ErrorHandler {
    static handle(error, context) {
        this.logger.error(`Error in ${context}: ${error.message}`);
    }
    static async handleAsync(promise, context) {
        try {
            return await promise;
        }
        catch (error) {
            this.handle(error, context);
            return null;
        }
    }
}
exports.ErrorHandler = ErrorHandler;
ErrorHandler.logger = new Logger_1.Logger("ErrorHandler");
//# sourceMappingURL=ErrorHandling.js.map