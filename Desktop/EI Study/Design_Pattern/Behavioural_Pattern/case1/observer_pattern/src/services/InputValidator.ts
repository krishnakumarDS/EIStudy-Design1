export class InputValidator {
  static validateString(input: string, fieldName: string): void {
    if (!input || input.trim() === "") {
      throw new Error(`${fieldName} cannot be empty`);
    }
  }

  static validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }
  }

  static validatePhone(phone: string): void {
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(phone)) {
      throw new Error("Phone number must be 10-15 digits");
    }
  }

  static validateChoice(input: string, validChoices: string[]): void {
    if (!validChoices.includes(input)) {
      throw new Error(
        `Invalid choice. Please select one of: ${validChoices.join(", ")}`
      );
    }
  }

  static validateSubscriberId(id: string): void {
    if (!id || id.trim() === "") {
      throw new Error("Subscriber ID cannot be empty");
    }
  }
}
