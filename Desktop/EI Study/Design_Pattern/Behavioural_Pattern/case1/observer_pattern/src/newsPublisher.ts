import { ISubject } from "./interfaces/ISubject";
import { IObserver } from "./interfaces/IObserver";
import { NewsItem } from "./models/NewsItem";
import { Logger } from "./services/Logger";
import { ErrorHandler } from "./services/ErrorHandling";

export class NewsPublisher implements ISubject {
  private observers: Map<string, IObserver> = new Map();
  private logger: Logger = new Logger("NewsPublisher");
  private newsHistory: NewsItem[] = [];

  attach(observer: IObserver): void {
    if (this.observers.has(observer.id)) {
      this.logger.warn(`Observer with ID ${observer.id} already exists`);
      return;
    }
    this.observers.set(observer.id, observer);
    this.logger.info(
      `Observer attached: ${observer.name} (${observer.getSubscriberType()})`
    );
  }

  detach(observer: IObserver): void {
    if (!this.observers.has(observer.id)) {
      this.logger.warn(`Observer with ID ${observer.id} not found`);
      return;
    }
    this.observers.delete(observer.id);
    this.logger.info(
      `Observer detached: ${observer.name} (${observer.getSubscriberType()})`
    );
  }

  notify(news: NewsItem): void {
    this.logger.info(
      `Notifying ${this.observers.size} observers about news: ${news.title}`
    );
    this.newsHistory.push(news);

    for (const observer of this.observers.values()) {
      try {
        observer.update(news);
      } catch (error) {
        ErrorHandler.handle(
          error as Error,
          `Notifying observer ${observer.id}`
        );
      }
    }
  }

  getObservers(): IObserver[] {
    return Array.from(this.observers.values());
  }

  publishNews(title: string, content: string): void {
    if (!title.trim() || !content.trim()) {
      throw new Error("Title and content cannot be empty");
    }

    const news = new NewsItem(this.generateId(), title, content, new Date());

    this.notify(news);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  getNewsHistory(): NewsItem[] {
    return [...this.newsHistory];
  }
}
