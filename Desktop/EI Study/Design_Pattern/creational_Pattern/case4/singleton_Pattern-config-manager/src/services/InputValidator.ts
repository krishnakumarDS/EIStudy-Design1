export class InputValidator {
  static validateString(input: string, fieldName: string): void {
    if (!input || input.trim() === "") {
      throw new Error(`${fieldName} cannot be empty`);
    }
  }

  static validateChoice(input: string, validChoices: string[]): void {
    if (!validChoices.includes(input)) {
      throw new Error(
        `Invalid choice. Please select one of: ${validChoices.join(", ")}`
      );
    }
  }

  static validateKey(key: string): void {
    if (!key || key.trim() === "") {
      throw new Error("Key cannot be empty");
    }
    if (key.includes(" ")) {
      throw new Error("Key cannot contain spaces");
    }
  }

  static validateNumber(value: string): void {
    if (isNaN(Number(value))) {
      throw new Error("Value must be a valid number");
    }
  }

  static validateBoolean(value: string): void {
    const lowerValue = value.toLowerCase();
    if (lowerValue !== "true" && lowerValue !== "false") {
      throw new Error('Value must be either "true" or "false"');
    }
  }
}
