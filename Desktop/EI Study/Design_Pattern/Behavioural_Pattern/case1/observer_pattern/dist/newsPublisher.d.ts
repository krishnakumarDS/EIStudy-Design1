import { ISubject } from "./interfaces/ISubject";
import { IObserver } from "./interfaces/IObserver";
import { NewsItem } from "./models/NewsItem";
export declare class NewsPublisher implements ISubject {
    private observers;
    private logger;
    private newsHistory;
    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(news: NewsItem): void;
    getObservers(): IObserver[];
    publishNews(title: string, content: string): void;
    private generateId;
    getNewsHistory(): NewsItem[];
}
//# sourceMappingURL=newsPublisher.d.ts.map