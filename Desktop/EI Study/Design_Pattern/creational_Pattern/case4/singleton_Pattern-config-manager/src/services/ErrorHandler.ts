import { Logger } from "./Logger";

export class ErrorHandler {
  private static logger: Logger = Logger.getInstance("ErrorHandler");

  static handle(error: Error, context: string): void {
    this.logger.error(`Error in ${context}: ${error.message}`);
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
