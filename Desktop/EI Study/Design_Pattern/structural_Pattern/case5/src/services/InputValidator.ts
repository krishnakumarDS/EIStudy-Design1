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

  static validateFileName(fileName: string): void {
    if (!fileName || fileName.trim() === "") {
      throw new Error("File name cannot be empty");
    }

    // Basic file name validation
    if (/[\\/:*?"<>|]/.test(fileName)) {
      throw new Error("File name contains invalid characters");
    }
  }
}
