import { IObserver } from "../interfaces/IObserver";
import { NewsItem } from "../strategies/NewsItem";
export declare class SMSSubscriber implements IObserver {
    readonly id: string;
    readonly name: string;
    private phone;
    private logger;
    constructor(name: string, phone: string);
    update(news: NewsItem): void;
    getSubscriberType(): string;
    getContactInfo(): string;
    private generateId;
}
//# sourceMappingURL=SMSSubscriber.d.ts.map