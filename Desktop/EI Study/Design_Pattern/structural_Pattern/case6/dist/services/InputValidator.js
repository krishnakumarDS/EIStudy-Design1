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
    static validateNumber(input, fieldName) {
        const num = parseFloat(input);
        if (isNaN(num)) {
            throw new Error(`${fieldName} must be a valid number`);
        }
    }
}
exports.InputValidator = InputValidator;
//# sourceMappingURL=InputValidator.js.map