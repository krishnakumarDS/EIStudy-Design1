"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailSubscriber = void 0;
const SubscriberType_1 = require("../models/SubscriberType");
const Logger_1 = require("../services/Logger");
class EmailSubscriber {
    constructor(name, email) {
        this.logger = new Logger_1.Logger("EmailSubscriber");
        this.id = this.generateId();
        this.name = name;
        this.email = email;
    }
    update(news) {
        this.logger.info(`Sending email to ${this.email} (${this.name}) about: ${news.title}`);
        console.log(`[EMAIL] ${this.name} (${this.email}): ${news.title}`);
        console.log(`  ${news.content}`);
    }
    getSubscriberType() {
        return SubscriberType_1.SubscriberType.EMAIL;
    }
    getContactInfo() {
        return this.email;
    }
    generateId() {
        return ("email_" + Date.now().toString(36) + Math.random().toString(36).substr(2));
    }
}
exports.EmailSubscriber = EmailSubscriber;
//# sourceMappingURL=EmailSubscriber.js.map