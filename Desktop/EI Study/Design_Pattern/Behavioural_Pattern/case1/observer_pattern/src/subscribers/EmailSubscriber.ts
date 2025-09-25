import { IObserver } from "../interfaces/IObserver";
import { NewsItem } from "../models/NewsItem";
import { SubscriberType } from "../models/SubscriberType";
import { Logger } from "../services/Logger";

export class EmailSubscriber implements IObserver {
  readonly id: string;
  readonly name: string;
  private email: string;
  private logger: Logger = new Logger("EmailSubscriber");

  constructor(name: string, email: string) {
    this.id = this.generateId();
    this.name = name;
    this.email = email;
  }

  update(news: NewsItem): void {
    this.logger.info(
      `Sending email to ${this.email} (${this.name}) about: ${news.title}`
    );
    console.log(`[EMAIL] ${this.name} (${this.email}): ${news.title}`);
    console.log(`  ${news.content}`);
  }

  getSubscriberType(): string {
    return SubscriberType.EMAIL;
  }

  getContactInfo(): string {
    return this.email;
  }

  private generateId(): string {
    return (
      "email_" + Date.now().toString(36) + Math.random().toString(36).substr(2)
    );
  }
}
