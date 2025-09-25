import { IObserver } from "../interfaces/IObserver";
import { NewsItem } from "../models/NewsItem";
import { SubscriberType } from "../models/SubscriberType";
import { Logger } from "../services/Logger";

export class PushNotificationSubscriber implements IObserver {
  readonly id: string;
  readonly name: string;
  private deviceId: string;
  private logger: Logger = new Logger("PushNotificationSubscriber");

  constructor(name: string, deviceId: string) {
    this.id = this.generateId();
    this.name = name;
    this.deviceId = deviceId;
  }

  update(news: NewsItem): void {
    this.logger.info(
      `Sending push notification to device ${this.deviceId} (${this.name}) about: ${news.title}`
    );
    console.log(
      `[PUSH] ${this.name} (Device: ${this.deviceId}): ${news.title}`
    );
    console.log(
      `  ${news.content.substring(0, 30)}${
        news.content.length > 30 ? "..." : ""
      }`
    );
  }

  getSubscriberType(): string {
    return SubscriberType.PUSH;
  }

  getContactInfo(): string {
    return this.deviceId;
  }

  private generateId(): string {
    return (
      "push_" + Date.now().toString(36) + Math.random().toString(36).substr(2)
    );
  }
}
