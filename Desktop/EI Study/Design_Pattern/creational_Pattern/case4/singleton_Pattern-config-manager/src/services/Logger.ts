export class Logger {
  private static instance: Logger;
  private context: string;

  private constructor(context: string = "App") {
    this.context = context;
  }

  static getInstance(context?: string): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(context);
    }
    return Logger.instance;
  }

  private formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] [${this.context}]: ${message}`;
  }

  info(message: string): void {
    console.log(this.formatMessage("INFO", message));
  }

  warn(message: string): void {
    console.warn(this.formatMessage("WARN", message));
  }

  error(message: string): void {
    console.error(this.formatMessage("ERROR", message));
  }
}
