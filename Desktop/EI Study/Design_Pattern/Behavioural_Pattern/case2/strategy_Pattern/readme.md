# Strategy Pattern - Text Formatter System

## Description

This project demonstrates the Strategy behavioral design pattern through a text formatting system. The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.

In this implementation, the `TextFormatterContext` (context) maintains a reference to a formatting strategy object and delegates the formatting tasks to it. Different text formatting strategies (UpperCase, LowerCase, Capitalize, Reverse) can be selected and swapped at runtime without changing the context class.

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

1. **Strategy Pattern Implementation**:

   - Context (TextFormatterContext) maintains a reference to a strategy object
   - Concrete strategies (UpperCaseFormatter, LowerCaseFormatter, etc.) implement the formatting algorithm
   - Strategies can be changed at runtime without affecting the context

2. **Input Validation**:

   - Validates that text input is not empty
   - Validates that user choices are within the allowed options
   - Validates maximum text length to prevent excessive input

3. **Error Handling**:

   - Comprehensive error handling with try-catch blocks
   - Custom ErrorHandler for consistent error processing
   - Graceful error recovery

4. **Logging Mechanism**:

   - Custom Logger class with different log levels (info, warn, error)
   - Timestamped log messages with context information
   - Logging of all important operations

5. **Long-running Application**:

   - The application runs continuously until the user chooses to exit
   - No hard-coded boolean flags (e.g., while(true))
   - Clean shutdown mechanism

6. **Defensive Programming**:
   - Input validation at all levels
   - Null checks and parameter validation
   - Safe handling of edge cases

## Project Structure

```
strategy-pattern-text-formatter/
├── src/
│   ├── interfaces/
│   │   └── ITextFormatter.ts
│   ├── strategies/
│   │   ├── UpperCaseFormatter.ts
│   │   ├── LowerCaseFormatter.ts
│   │   ├── CapitalizeFormatter.ts
│   │   └── ReverseFormatter.ts
│   ├── services/
│   │   ├── Logger.ts
│   │   ├── InputValidator.ts
│   │   └── ErrorHandler.ts
│   ├── TextFormatterContext.ts
│   ├── app.ts
│   └── main.ts
├── dist/
├── package.json
├── tsconfig.json
└── README.md
```

## Strategy Pattern Implementation

### Components

1. **Strategy Interface (ITextFormatter)**:

   - Defines the contract for all formatting strategies
   - Includes methods for formatting text and getting the strategy name

2. **Context (TextFormatterContext)**:

   - Maintains a reference to a strategy object
   - Provides methods to set the strategy and perform formatting
   - Delegates the formatting work to the current strategy

3. **Concrete Strategies**:

   - **UpperCaseFormatter**: Converts text to uppercase
   - **LowerCaseFormatter**: Converts text to lowercase
   - **CapitalizeFormatter**: Capitalizes the first letter of each word
   - **ReverseFormatter**: Reverses the text

4. **Services**:
   - **Logger**: Handles logging throughout the application
   - **InputValidator**: Validates user inputs
   - **ErrorHandler**: Manages error handling and recovery

### How It Works

1. The application starts with a default formatting strategy (UpperCase)
2. Users can:
   - Format text using the current strategy
   - Change the formatting strategy
   - Exit the application
3. When formatting text:
   - The `TextFormatterContext` receives the text
   - It delegates the formatting to the current strategy
   - The formatted text is returned and displayed
4. When changing strategies:
   - Users can select from available formatting options
   - The context updates its strategy reference
   - The new strategy is used for subsequent formatting operations

## Expected Output

When you run the application, you'll see output similar to this:

```
=== Text Formatter ===
Current formatter: Uppercase
1. Format Text
2. Change Formatter
3. Exit
Enter your choice (1-3): 1

=== Format Text ===
Enter text to format: hello world

Formatted text:
HELLO WORLD

=== Text Formatter ===
Current formatter: Uppercase
1. Format Text
2. Change Formatter
3. Exit
Enter your choice (1-3): 2

=== Change Formatter ===
Available formatters:
1. Uppercase
2. Lowercase
3. Capitalize
4. Reverse
Enter your choice (1-4): 3
Formatter changed to Capitalize

=== Text Formatter ===
Current formatter: Capitalize
1. Format Text
2. Change Formatter
3. Exit
Enter your choice (1-3): 1

=== Format Text ===
Enter text to format: hello world

Formatted text:
Hello World

=== Text Formatter ===
Current formatter: Capitalize
1. Format Text
2. Change Formatter
3. Exit
Enter your choice (1-3): 2

=== Change Formatter ===
Available formatters:
1. Uppercase
2. Lowercase
3. Capitalize
4. Reverse
Enter your choice (1-4): 4
Formatter changed to Reverse

=== Text Formatter ===
Current formatter: Reverse
1. Format Text
2. Change Formatter
3. Exit
Enter your choice (1-3): 1

=== Format Text ===
Enter text to format: hello world

Formatted text:
dlrow olleh
```

This implementation demonstrates the Strategy pattern in a clean TypeScript console application with robust input validation and error handling. The pattern allows encapsulating related algorithms and making them interchangeable, providing flexibility and promoting the Open/Closed Principle.
