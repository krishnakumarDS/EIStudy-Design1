import { IObserver } from "../interfaces/IObserver";
import { NewsItem } from "../models/NewsItem";
export declare class EmailSubscriber implements IObserver {
    readonly id: string;
    readonly name: string;
    private email;
    private logger;
    constructor(name: string, email: string);
    update(news: NewsItem): void;
    getSubscriberType(): string;
    getContactInfo(): string;
    private generateId;
}
//# sourceMappingURL=EmailSubscriber.d.ts.map