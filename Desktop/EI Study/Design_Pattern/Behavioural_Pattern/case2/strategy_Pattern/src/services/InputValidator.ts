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

  static validateMaxLength(
    input: string,
    maxLength: number,
    fieldName: string
  ): void {
    if (input.length > maxLength) {
      throw new Error(`${fieldName} cannot exceed ${maxLength} characters`);
    }
  }
}
