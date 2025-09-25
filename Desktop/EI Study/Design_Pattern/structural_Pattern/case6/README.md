# Decorator Pattern - Coffee Ordering System

## Description

This project demonstrates the Decorator structural design pattern through a coffee ordering system. The Decorator pattern attaches additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.

In this implementation, the base coffee (`SimpleCoffee`) can be decorated with various condiments (milk, sugar, whip, caramel) dynamically. Each decorator adds its own behavior and cost to the base coffee, allowing for flexible combinations without creating a class for every possible combination.

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

1. **Decorator Pattern Implementation**:

   - `ICoffee` interface defines the component interface
   - `SimpleCoffee` is the concrete component
   - `CoffeeDecorator` is the base decorator that implements `ICoffee` and holds a reference to a component
   - Concrete decorators (`MilkDecorator`, `SugarDecorator`, `WhipDecorator`, `CaramelDecorator`) extend the base decorator and add functionality

2. **Dynamic Composition**:

   - Decorators can be added or removed at runtime
   - Multiple decorators can be stacked to add multiple behaviors
   - The order of decorators matters (affects the description)

3. **Input Validation**:

   - Validates that user choices are within the allowed options
   - Provides meaningful error messages for invalid inputs

4. **Error Handling**:

   - Comprehensive error handling with try-catch blocks
   - Custom ErrorHandler for consistent error processing
   - Graceful error recovery

5. **Logging Mechanism**:

   - Custom Logger class with different log levels (info, warn, error)
   - Timestamped log messages with context information
   - Logging of all important operations

6. **Long-running Application**:

   - The application runs continuously until the user chooses to exit
   - No hard-coded boolean flags (e.g., while(true))
   - Clean shutdown mechanism

7. **Defensive Programming**:
   - Input validation at all levels
   - Null checks and parameter validation
   - Safe handling of edge cases

## Project Structure

```
decorator-pattern-coffee-system/
├── src/
│   ├── interfaces/
│   │   └── ICoffee.ts
│   ├── components/
│   │   └── SimpleCoffee.ts
│   ├── decorators/
│   │   ├── CoffeeDecorator.ts
│   │   ├── MilkDecorator.ts
│   │   ├── SugarDecorator.ts
│   │   ├── WhipDecorator.ts
│   │   └── CaramelDecorator.ts
│   ├── services/
│   │   ├── Logger.ts
│   │   ├── InputValidator.ts
│   │   └── ErrorHandler.ts
│   ├── app.ts
│   └── main.ts
├── dist/
├── package.json
├── tsconfig.json
└── README.md
```

## Decorator Pattern Implementation

### Components

1. **Component Interface (ICoffee)**:

   - Defines the interface for objects that can have responsibilities added to them dynamically
   - Includes methods for getting cost and description

2. **Concrete Component (SimpleCoffee)**:

   - Defines an object to which additional responsibilities can be attached
   - Implements the `ICoffee` interface with basic functionality

3. **Base Decorator (CoffeeDecorator)**:

   - Maintains a reference to a `ICoffee` object
   - Implements the `ICoffee` interface and forwards all requests to the component
   - Provides default behavior that can be extended by concrete decorators

4. **Concrete Decorators**:

   - `MilkDecorator`: Adds milk to the coffee and updates cost and description
   - `SugarDecorator`: Adds sugar to the coffee and updates cost and description
   - `WhipDecorator`: Adds whipped cream to the coffee and updates cost and description
   - `CaramelDecorator`: Adds caramel to the coffee and updates cost and description

5. **Services**:
   - **Logger**: Handles logging throughout the application
   - **InputValidator**: Validates user inputs
   - **ErrorHandler**: Manages error handling and recovery

### How It Works

1. The application starts and presents a menu to the user
2. Users can:
   - Order a coffee (starting with a simple coffee)
   - Add condiments dynamically (milk, sugar, whip, caramel)
   - Finish the order to see the final description and cost
   - Exit the application
3. When ordering coffee:
   - The application starts with a `SimpleCoffee` instance
   - As the user selects condiments, the coffee is wrapped with the appropriate decorators
   - Each decorator adds its own cost and description to the base coffee
   - The order of decorators affects the description but not the cost (costs are additive)
4. When the order is finished, the final description and total cost are displayed

## Expected Output

When you run the application, you'll see output similar to this:

```
=== Coffee Ordering System ===
1. Order Coffee
2. Exit
Enter your choice (1-2): 1

=== Order Coffee ===
Base coffee: Simple Coffee - $5.00

Add condiments:
1. Milk (+$1.50)
2. Sugar (+$0.50)
3. Whip (+$2.00)
4. Caramel (+$2.50)
5. Finish Order
Enter your choice (1-5): 1
Added Milk: Simple Coffee, Milk - $6.50

Add condiments:
1. Milk (+$1.50)
2. Sugar (+$0.50)
3. Whip (+$2.00)
4. Caramel (+$2.50)
5. Finish Order
Enter your choice (1-5): 2
Added Sugar: Simple Coffee, Milk, Sugar - $7.00

Add condiments:
1. Milk (+$1.50)
2. Sugar (+$0.50)
3. Whip (+$2.00)
4. Caramel (+$2.50)
5. Finish Order
Enter your choice (1-5): 5

=== Final Order ===
Description: Simple Coffee, Milk, Sugar
Total Cost: $7.00
```

This implementation demonstrates the Decorator pattern in a clean TypeScript console application with robust input validation and error handling. The pattern allows adding new responsibilities to objects dynamically without modifying their code, providing a flexible alternative to subclassing for extending functionality.
