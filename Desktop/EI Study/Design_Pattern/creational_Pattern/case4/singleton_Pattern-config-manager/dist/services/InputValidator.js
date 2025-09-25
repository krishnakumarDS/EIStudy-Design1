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
    static validateKey(key) {
        if (!key || key.trim() === "") {
            throw new Error("Key cannot be empty");
        }
        if (key.includes(" ")) {
            throw new Error("Key cannot contain spaces");
        }
    }
    static validateNumber(value) {
        if (isNaN(Number(value))) {
            throw new Error("Value must be a valid number");
        }
    }
    static validateBoolean(value) {
        const lowerValue = value.toLowerCase();
        if (lowerValue !== "true" && lowerValue !== "false") {
            throw new Error('Value must be either "true" or "false"');
        }
    }
}
exports.InputValidator = InputValidator;
//# sourceMappingURL=InputValidator.js.map