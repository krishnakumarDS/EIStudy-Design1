"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputValidator = void 0;
class InputValidator {
    static validateString(input, fieldName) {
        if (!input || input.trim() === "") {
            throw new Error(`${fieldName} cannot be empty`);
        }
    }
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format");
        }
    }
    static validatePhone(phone) {
        const phoneRegex = /^\d{10,15}$/;
        if (!phoneRegex.test(phone)) {
            throw new Error("Phone number must be 10-15 digits");
        }
    }
    static validateChoice(input, validChoices) {
        if (!validChoices.includes(input)) {
            throw new Error(`Invalid choice. Please select one of: ${validChoices.join(", ")}`);
        }
    }
    static validateSubscriberId(id) {
        if (!id || id.trim() === "") {
            throw new Error("Subscriber ID cannot be empty");
        }
    }
}
exports.InputValidator = InputValidator;
//# sourceMappingURL=InputValidator.js.map