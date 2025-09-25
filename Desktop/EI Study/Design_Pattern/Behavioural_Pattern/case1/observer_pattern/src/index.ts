import { NewsPublisher } from "./newsPublisher";
import { EmailSubscriber } from "./subscribers/EmailSubscriber";
import { SMSSubscriber } from "./subscribers/SMSSubscriber";
import { PushNotificationSubscriber } from "./subscribers/PushNotificationSubscriber";
import { Logger } from "./services/Logger";
import { InputValidator } from "./services/InputValidator";
import { ErrorHandler } from "./services/ErrorHandling";
import { SubscriberType } from "./models/SubscriberType";
import * as readline from "readline";

class NewsApplication {
  private publisher: NewsPublisher;
  private logger: Logger;
  private rl: readline.Interface;

  constructor() {
    this.publisher = new NewsPublisher();
    this.logger = new Logger("NewsApplication");
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async run(): Promise<void> {
    this.logger.info("Starting News Application");

    try {
      await this.showMainMenu();
    } catch (error) {
      ErrorHandler.handle(error as Error, "Main Application Loop");
    } finally {
      this.rl.close();
      this.logger.info("Application terminated");
    }
  }

  private async showMainMenu(): Promise<void> {
    let running = true;

    while (running) {
      try {
        console.log("\n=== News Publisher System ===");
        console.log("1. Publish News");
        console.log("2. Add Subscriber");
        console.log("3. Remove Subscriber");
        console.log("4. List Subscribers");
        console.log("5. View News History");
        console.log("6. Exit");

        const choice = await this.promptUser("Enter your choice (1-6): ");
        InputValidator.validateChoice(choice, ["1", "2", "3", "4", "5", "6"]);

        switch (choice) {
          case "1":
            await this.publishNews();
            break;
          case "2":
            await this.addSubscriber();
            break;
          case "3":
            await this.removeSubscriber();
            break;
          case "4":
            await this.listSubscribers();
            break;
          case "5":
            await this.viewNewsHistory();
            break;
          case "6":
            running = false;
            break;
        }
      } catch (error) {
        ErrorHandler.handle(error as Error, "Main Menu");
        console.log(`Error: ${(error as Error).message}`);
      }
    }
  }

  private async publishNews(): Promise<void> {
    console.log("\n=== Publish News ===");
    const title = await this.promptUser("Enter news title: ");
    InputValidator.validateString(title, "Title");

    const content = await this.promptUser("Enter news content: ");
    InputValidator.validateString(content, "Content");

    try {
      this.publisher.publishNews(title, content);
      console.log("News published successfully!");
    } catch (error) {
      ErrorHandler.handle(error as Error, "Publish News");
      throw error;
    }
  }

  private async addSubscriber(): Promise<void> {
    console.log("\n=== Add Subscriber ===");
    console.log("Select subscriber type:");
    console.log("1. Email");
    console.log("2. SMS");
    console.log("3. Push Notification");

    const typeChoice = await this.promptUser("Enter your choice (1-3): ");
    InputValidator.validateChoice(typeChoice, ["1", "2", "3"]);

    const name = await this.promptUser("Enter subscriber name: ");
    InputValidator.validateString(name, "Name");

    let subscriber:
      | EmailSubscriber
      | SMSSubscriber
      | PushNotificationSubscriber
      | undefined;

    try {
      switch (typeChoice) {
        case "1":
          const email = await this.promptUser("Enter email address: ");
          InputValidator.validateEmail(email);
          subscriber = new EmailSubscriber(name, email);
          break;
        case "2":
          const phone = await this.promptUser("Enter phone number: ");
          InputValidator.validatePhone(phone);
          subscriber = new SMSSubscriber(name, phone);
          break;
        case "3":
          const deviceId = await this.promptUser("Enter device ID: ");
          InputValidator.validateString(deviceId, "Device ID");
          subscriber = new PushNotificationSubscriber(name, deviceId);
          break;
      }

      if (subscriber) {
        this.publisher.attach(subscriber);
        console.log("Subscriber added successfully!");
      } else {
        throw new Error("Failed to create subscriber. Invalid type selected.");
      }
    } catch (error) {
      ErrorHandler.handle(error as Error, "Add Subscriber");
      throw error;
    }
  }

  private async removeSubscriber(): Promise<void> {
    console.log("\n=== Remove Subscriber ===");
    const subscribers = this.publisher.getObservers();

    if (subscribers.length === 0) {
      console.log("No subscribers to remove.");
      return;
    }

    console.log("Current subscribers:");
    subscribers.forEach((sub) => {
      console.log(
        `${sub.id}: ${
          sub.name
        } (${sub.getSubscriberType()}) - ${sub.getContactInfo()}`
      );
    });

    const subscriberId = await this.promptUser(
      "Enter subscriber ID to remove: "
    );
    InputValidator.validateSubscriberId(subscriberId);

    try {
      const observer = subscribers.find((sub) => sub.id === subscriberId);
      if (!observer) {
        throw new Error("Subscriber not found.");
      }
      this.publisher.detach(observer);
      console.log("Subscriber removed successfully!");
    } catch (error) {
      ErrorHandler.handle(error as Error, "Remove Subscriber");
      throw error;
    }
  }

  private async listSubscribers(): Promise<void> {
    console.log("\n=== List Subscribers ===");
    const subscribers = this.publisher.getObservers();

    if (subscribers.length === 0) {
      console.log("No subscribers found.");
      return;
    }

    console.log(`Total subscribers: ${subscribers.length}`);
    subscribers.forEach((sub) => {
      console.log(`ID: ${sub.id}`);
      console.log(`Name: ${sub.name}`);
      console.log(`Type: ${sub.getSubscriberType()}`);
      console.log(`Contact: ${sub.getContactInfo()}`);
      console.log("---");
    });
  }

  private async viewNewsHistory(): Promise<void> {
    console.log("\n=== News History ===");
    const newsHistory = this.publisher.getNewsHistory();

    if (newsHistory.length === 0) {
      console.log("No news published yet.");
      return;
    }

    console.log(`Total news items: ${newsHistory.length}`);
    newsHistory.forEach((news) => {
      console.log(`ID: ${news.id}`);
      console.log(`Title: ${news.title}`);
      console.log(`Content: ${news.content}`);
      console.log(`Published: ${news.timestamp.toISOString()}`);
      console.log("---");
    });
  }

  private promptUser(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }
}

// Start the application
const app = new NewsApplication();
app.run().catch((error) => {
  console.error("Application crashed:", error);
  process.exit(1);
});
