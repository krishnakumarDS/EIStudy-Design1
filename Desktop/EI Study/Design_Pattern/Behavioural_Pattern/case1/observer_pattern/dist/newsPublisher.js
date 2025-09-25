"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsPublisher = void 0;
const NewsItem_1 = require("./models/NewsItem");
const Logger_1 = require("./services/Logger");
const ErrorHandling_1 = require("./services/ErrorHandling");
class NewsPublisher {
    constructor() {
        this.observers = new Map();
        this.logger = new Logger_1.Logger("NewsPublisher");
        this.newsHistory = [];
    }
    attach(observer) {
        if (this.observers.has(observer.id)) {
            this.logger.warn(`Observer with ID ${observer.id} already exists`);
            return;
        }
        this.observers.set(observer.id, observer);
        this.logger.info(`Observer attached: ${observer.name} (${observer.getSubscriberType()})`);
    }
    detach(observer) {
        if (!this.observers.has(observer.id)) {
            this.logger.warn(`Observer with ID ${observer.id} not found`);
            return;
        }
        this.observers.delete(observer.id);
        this.logger.info(`Observer detached: ${observer.name} (${observer.getSubscriberType()})`);
    }
    notify(news) {
        this.logger.info(`Notifying ${this.observers.size} observers about news: ${news.title}`);
        this.newsHistory.push(news);
        for (const observer of this.observers.values()) {
            try {
                observer.update(news);
            }
            catch (error) {
                ErrorHandling_1.ErrorHandler.handle(error, `Notifying observer ${observer.id}`);
            }
        }
    }
    getObservers() {
        return Array.from(this.observers.values());
    }
    publishNews(title, content) {
        if (!title.trim() || !content.trim()) {
            throw new Error("Title and content cannot be empty");
        }
        const news = new NewsItem_1.NewsItem(this.generateId(), title, content, new Date());
        this.notify(news);
    }
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    getNewsHistory() {
        return [...this.newsHistory];
    }
}
exports.NewsPublisher = NewsPublisher;
//# sourceMappingURL=newsPublisher.js.map