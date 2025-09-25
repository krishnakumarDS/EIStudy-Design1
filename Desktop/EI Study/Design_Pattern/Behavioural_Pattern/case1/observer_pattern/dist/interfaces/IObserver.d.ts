import { NewsItem } from "../models/NewsItem";
export interface IObserver {
    id: string;
    name: string;
    update(news: NewsItem): void;
    getSubscriberType(): string;
    getContactInfo(): string;
}
//# sourceMappingURL=IObserver.d.ts.map