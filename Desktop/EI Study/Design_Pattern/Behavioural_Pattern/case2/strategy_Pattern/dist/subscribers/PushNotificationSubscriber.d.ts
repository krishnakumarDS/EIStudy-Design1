import { IObserver } from "../interfaces/IObserver";
import { NewsItem } from "../strategies/NewsItem";
export declare class PushNotificationSubscriber implements IObserver {
    readonly id: string;
    readonly name: string;
    private deviceId;
    private logger;
    constructor(name: string, deviceId: string);
    update(news: NewsItem): void;
    getSubscriberType(): string;
    getContactInfo(): string;
    private generateId;
}
//# sourceMappingURL=PushNotificationSubscriber.d.ts.map