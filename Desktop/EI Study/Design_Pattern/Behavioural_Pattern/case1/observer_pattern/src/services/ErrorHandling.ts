import { Logger } from "./Logger";

export class ErrorHandler {
  private static logger: Logger = new Logger("ErrorHandler");

  static handle(error: Error, context: string): void {
    this.logger.error(`Error in ${context}: ${error.message}`);

    // In a real application, we might:
    // 1. Log to a file or external service
    // 2. Send an alert to administrators
    // 3. Implement retry logic for transient errors

    // For transient errors, we could implement a retry mechanism
    if (this.isTransientError(error)) {
      this.logger.info(
        `Transient error detected in ${context}. Consider retrying.`
      );
      // Implement retry logic if needed
    }
  }

  private static isTransientError(error: Error): boolean {
    // Define what constitutes a transient error
    const transientMessages = [
      "timeout",
      "connection refused",
      "temporary failure",
      "service unavailable",
    ];

    return transientMessages.some((msg) =>
      error.message.toLowerCase().includes(msg)
    );
  }

  static async handleAsync<T>(
    promise: Promise<T>,
    context: string
  ): Promise<T | null> {
    try {
      return await promise;
    } catch (error) {
      this.handle(error as Error, context);
      return null;
    }
  }
}
