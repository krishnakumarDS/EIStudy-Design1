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

  static validateNumber(input: string, fieldName: string): void {
    const num = parseFloat(input);
    if (isNaN(num)) {
      throw new Error(`${fieldName} must be a valid number`);
    }
  }
}
