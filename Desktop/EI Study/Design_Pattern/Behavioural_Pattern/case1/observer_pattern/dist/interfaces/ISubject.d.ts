import { IObserver } from "./IObserver";
import { NewsItem } from "../models/NewsItem";
export interface ISubject {
    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(news: NewsItem): void;
    getObservers(): IObserver[];
}
//# sourceMappingURL=ISubject.d.ts.map