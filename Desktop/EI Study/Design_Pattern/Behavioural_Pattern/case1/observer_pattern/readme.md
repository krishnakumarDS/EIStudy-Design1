# Observer Pattern - News Publisher System

## Description

This project demonstrates the Observer behavioral design pattern through a news publisher-subscriber system. The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

In this implementation, the `NewsPublisher` (subject) maintains a list of subscribers (observers) and notifies them whenever news is published. Subscribers can be dynamically added or removed, and they receive updates when the publisher's state changes.

## How to Run the Project

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the project:
   ```bash
   npm run build
   ```
5. Run the application:
   ```bash
   npm start
   ```

For development, you can run:

```bash
npm run dev
```

## Key Features

1. **Observer Pattern Implementation**:

   - Subject (NewsPublisher) maintains a list of observers
   - Observers (EmailSubscriber, SMSSubscriber, PushNotificationSubscriber) register with the subject
   - When the subject's state changes (news is published), all observers are notified

2. **Real-time User Input**:

   - Interactive menu-driven interface
   - Users can publish news, add/remove subscribers, and view history
   - All actions are performed in real-time based on user input

3. **Long-running Application**:

   - The application runs continuously until the user chooses to exit
   - No hard-coded boolean flags (e.g., while(true))
   - Clean shutdown mechanism

4. **Logging Mechanism**:

   - Custom Logger class with different log levels (info, warn, error)
   - Timestamped log messages with context information
   - Logging of all important operations

5. **Exception Handling**:

   - Comprehensive error handling with try-catch blocks
   - Custom ErrorHandler for consistent error processing
   - Transient error detection and handling

6. **Input Validation**:

   - InputValidator class for validating all user inputs
   - Specific validation for emails, phone numbers, and choices
   - Meaningful error messages for invalid inputs

7. **Defensive Programming**:
   - Null checks and parameter validation
   - Graceful error recovery
   - Safe handling of edge cases

## Project Structure

```
observer-pattern-news-publisher/
├── src/
│   ├── interfaces/
│   │   ├── ISubject.ts
│   │   └── IObserver.ts
│   ├── models/
│   │   ├── NewsItem.ts
│   │   └── SubscriberType.ts
│   ├── NewsPublisher.ts
│   ├── subscribers/
│   │   ├── EmailSubscriber.ts
│   │   ├── SMSSubscriber.ts
│   │   └── PushNotificationSubscriber.ts
│   ├── services/
│   │   ├── Logger.ts
│   │   ├── InputValidator.ts
│   │   └── ErrorHandler.ts
│   └── index.ts
├── dist/
├── package.json
├── tsconfig.json
└── README.md
```

## Observer Pattern Implementation

### Components

1. **Subject (NewsPublisher)**:

   - Maintains a list of observers
   - Provides methods to register, remove, and notify observers
   - When news is published, it notifies all registered observers

2. **Observer Interface (IObserver)**:

   - Defines the update method that subjects call to notify observers
   - Includes methods to get observer information

3. **Concrete Observers**:

   - **EmailSubscriber**: Sends notifications via email
   - **SMSSubscriber**: Sends notifications via SMS
   - **PushNotificationSubscriber**: Sends push notifications

4. **Models**:

   - **NewsItem**: Represents a news article with title, content, and timestamp
   - **SubscriberType**: Enum defining different types of subscribers

5. **Services**:
   - **Logger**: Handles logging throughout the application
   - **InputValidator**: Validates user inputs
   - **ErrorHandler**: Manages error handling and recovery

### How It Works

1. The application starts with a `NewsPublisher` instance
2. Users can:
   - Add subscribers of different types (email, SMS, push)
   - Remove subscribers by their ID
   - Publish news articles
   - View the list of current subscribers
   - View the history of published news
3. When news is published:
   - The `NewsPublisher` creates a `NewsItem`
   - It calls the `notify` method for all registered observers
   - Each observer receives the news and processes it according to its type
4. The application maintains a history of all published news items

## Expected Output

When you run the application, you'll see output similar to this:

```
=== News Publisher System ===
1. Publish News
2. Add Subscriber
3. Remove Subscriber
4. List Subscribers
5. View News History
6. Exit
Enter your choice (1-6): 2

=== Add Subscriber ===
Select subscriber type:
1. Email
2. SMS
3. Push Notification
Enter your choice (1-3): 1
Enter subscriber name: Alice
Enter email address: alice@example.com
Subscriber added successfully!

=== News Publisher System ===
1. Publish News
2. Add Subscriber
3. Remove Subscriber
4. List Subscribers
5. View News History
6. Exit
Enter your choice (1-6): 2

=== Add Subscriber ===
Select subscriber type:
1. Email
2. SMS
3. Push Notification
Enter your choice (1-3): 2
Enter subscriber name: Bob
Enter phone number: 1234567890
Subscriber added successfully!

=== News Publisher System ===
1. Publish News
2. Add Subscriber
3. Remove Subscriber
4. List Subscribers
5. View News History
6. Exit
Enter your choice (1-6): 1

=== Publish News ===
Enter news title: Breaking News
Enter news content: TypeScript 5.0 released with new features!
News published successfully!

[EMAIL] Alice (alice@example.com): Breaking News
  TypeScript 5.0 released with new features!
[SMS] Bob (1234567890): Breaking News
  TypeScript 5.0 released with new fe...
```

This implementation demonstrates the Observer pattern in a clean TypeScript console application with robust input validation, error handling, and real-time user interaction.
