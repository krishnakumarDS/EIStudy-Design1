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
    static validateMaxLength(input, maxLength, fieldName) {
        if (input.length > maxLength) {
            throw new Error(`${fieldName} cannot exceed ${maxLength} characters`);
        }
    }
}
exports.InputValidator = InputValidator;
//# sourceMappingURL=InputValidator.js.map