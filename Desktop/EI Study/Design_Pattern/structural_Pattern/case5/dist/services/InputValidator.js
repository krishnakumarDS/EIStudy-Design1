"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputValidator = void 0;
class InputValidator {
    static validateString(input, fieldName) {
        if (!input || input.trim() === "") {
            throw new Error(`${fieldName} cannot be empty`);
        }
    }
    static validateChoice(input, validChoices) {
        if (!validChoices.includes(input)) {
            throw new Error(`Invalid choice. Please select one of: ${validChoices.join(", ")}`);
        }
    }
    static validateFileName(fileName) {
        if (!fileName || fileName.trim() === "") {
            throw new Error("File name cannot be empty");
        }
        // Basic file name validation
        if (/[\\/:*?"<>|]/.test(fileName)) {
            throw new Error("File name contains invalid characters");
        }
    }
}
exports.InputValidator = InputValidator;
//# sourceMappingURL=InputValidator.js.map