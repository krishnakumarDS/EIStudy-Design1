"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const Logger_1 = require("./Logger");
class ErrorHandler {
    static handle(error, context) {
        this.logger.error(`Error in ${context}: ${error.message}`);
        // In a real application, we might:
        // 1. Log to a file or external service
        // 2. Send an alert to administrators
        // 3. Implement retry logic for transient errors
        // For transient errors, we could implement a retry mechanism
        if (this.isTransientError(error)) {
            this.logger.info(`Transient error detected in ${context}. Consider retrying.`);
            // Implement retry logic if needed
        }
    }
    static isTransientError(error) {
        // Define what constitutes a transient error
        const transientMessages = [
            "timeout",
            "connection refused",
            "temporary failure",
            "service unavailable",
        ];
        return transientMessages.some((msg) => error.message.toLowerCase().includes(msg));
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