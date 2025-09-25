import { IObserver } from "../interfaces/IObserver";
import { NewsItem } from "../models/NewsItem";
import { SubscriberType } from "../models/SubscriberType";
import { Logger } from "../services/Logger";

export class SMSSubscriber implements IObserver {
  readonly id: string;
  readonly name: string;
  private phone: string;
  private logger: Logger = new Logger("SMSSubscriber");

  constructor(name: string, phone: string) {
    this.id = this.generateId();
    this.name = name;
    this.phone = phone;
  }

  update(news: NewsItem): void {
    this.logger.info(
      `Sending SMS to ${this.phone} (${this.name}) about: ${news.title}`
    );
    console.log(`[SMS] ${this.name} (${this.phone}): ${news.title}`);
    console.log(
      `  ${news.content.substring(0, 50)}${
        news.content.length > 50 ? "..." : ""
      }`
    );
  }

  getSubscriberType(): string {
    return SubscriberType.SMS;
  }

  getContactInfo(): string {
    return this.phone;
  }

  private generateId(): string {
    return (
      "sms_" + Date.now().toString(36) + Math.random().toString(36).substr(2)
    );
  }
}
