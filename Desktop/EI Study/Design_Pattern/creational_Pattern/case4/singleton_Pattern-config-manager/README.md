# Singleton Pattern - Configuration Manager System

## Description

This project demonstrates the Singleton creational design pattern through a configuration management system. The Singleton pattern ensures that a class has only one instance and provides a global point of access to that instance. This pattern is particularly useful when exactly one object is needed to coordinate actions across the system.

In this implementation, the `ConfigurationManager` class is implemented as a singleton to ensure that only one instance manages the application's configuration throughout its lifecycle. The configuration is persisted to a JSON file, allowing settings to be maintained between application runs.

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

1. **Singleton Pattern Implementation**:

   - `ConfigurationManager` class has a private constructor to prevent direct instantiation
   - Static `getInstance()` method ensures only one instance exists
   - The instance is created lazily when first requested
   - Configuration is persisted to a JSON file for durability

2. **Configuration Management**:

   - Stores configuration items with keys, values, types, and descriptions
   - Supports different data types (string, number, boolean, JSON)
   - Loads default configuration and merges with file configuration
   - Provides methods to get, set, and remove configuration items

3. **Input Validation**:

   - Validates configuration keys (no empty keys, no spaces)
   - Validates values based on their type
   - Validates user choices for menu options

4. **Error Handling**:

   - Comprehensive error handling with try-catch blocks
   - Custom ErrorHandler for consistent error processing
   - Graceful error recovery

5. **Logging Mechanism**:

   - Custom Logger class (also implemented as a Singleton)
   - Timestamped log messages with context information
   - Logging of all important operations

6. **Long-running Application**:

   - The application runs continuously until the user chooses to exit
   - No hard-coded boolean flags (e.g., while(true))
   - Clean shutdown mechanism

7. **Defensive Programming**:
   - Input validation at all levels
   - Null checks and parameter validation
   - Safe handling of file operations

## Project Structure

```
singleton-pattern-config-manager/
├── src/
│   ├── models/
│   │   ├── ConfigItem.ts
│   │   └── ConfigType.ts
│   ├── services/
│   │   ├── Logger.ts
│   │   ├── InputValidator.ts
│   │   └── ErrorHandler.ts
│   ├── ConfigurationManager.ts
│   ├── ConfigSerializer.ts
│   ├── app.ts
│   └── main.ts
├── dist/
├── package.json
├── tsconfig.json
└── README.md
```

## Singleton Pattern Implementation

### Components

1. **Singleton Class (ConfigurationManager)**:

   - Private static instance variable
   - Private constructor to prevent instantiation
   - Public static method to get the single instance
   - Methods for managing configuration items

2. **Models**:

   - **ConfigItem**: Represents a configuration item with key, value, type, and description
   - **ConfigType**: Enum defining different types of configuration values

3. **ConfigSerializer**:

   - Handles serialization and deserialization of configuration to/from JSON
   - Ensures configuration can be persisted and loaded from files

4. **Services**:
   - **Logger**: Singleton class for logging throughout the application
   - **InputValidator**: Validates user inputs
   - **ErrorHandler**: Manages error handling and recovery

### How It Works

1. The application starts and obtains the single instance of `ConfigurationManager`
2. The `ConfigurationManager`:
   - Loads default configuration values
   - Attempts to load configuration from a JSON file (if it exists)
   - Merges file configuration with defaults (file takes precedence)
3. Users can:
   - View all configuration items
   - Add or update configuration items
   - Remove configuration items
   - Reset configuration to defaults
4. All changes are automatically saved to the JSON file
5. The application ensures that only one instance of `ConfigurationManager` exists throughout its lifecycle

## Expected Output

When you run the application, you'll see output similar to this:

```
=== Configuration Manager ===
1. View Configuration
2. Add/Update Configuration
3. Remove Configuration
4. Reset to Defaults
5. Exit
Enter your choice (1-5): 1

=== Current Configuration ===
Total configuration items: 5
Key: app.name
Value: Design Patterns Demo
Type: string
Description: Application name
---
Key: app.version
Value: 1.0.0
Type: string
Description: Application version
---
Key: app.debug
Value: false
Type: boolean
Description: Debug mode flag
---
Key: server.port
Value: 3000
Type: number
Description: Server port number
---
Key: database.enabled
Value: true
Type: boolean
Description: Database enabled flag
---

=== Configuration Manager ===
1. View Configuration
2. Add/Update Configuration
3. Remove Configuration
4. Reset to Defaults
5. Exit
Enter your choice (1-5): 2

=== Add/Update Configuration ===
Enter configuration key: theme
Enter configuration value: dark
Select value type:
1. String
2. Number
3. Boolean
4. JSON
Enter your choice (1-4): 1
Enter description (optional): Application theme
Configuration added successfully

=== Configuration Manager ===
1. View Configuration
2. Add/Update Configuration
3. Remove Configuration
4. Reset to Defaults
5. Exit
Enter your choice (1-5): 1

=== Current Configuration ===
Total configuration items: 6
Key: app.name
Value: Design Patterns Demo
Type: string
Description: Application name
---
Key: app.version
Value: 1.0.0
Type: string
Description: Application version
---
Key: app.debug
Value: false
Type: boolean
Description: Debug mode flag
---
Key: server.port
Value: 3000
Type: number
Description: Server port number
---
Key: database.enabled
Value: true
Type: boolean
Description: Database enabled flag
---
Key: theme
Value: dark
Type: string
Description: Application theme
---
```

This implementation demonstrates the Singleton pattern in a clean TypeScript console application with robust input validation, error handling, and configuration management capabilities. The pattern ensures that only one instance of the configuration manager exists throughout the application, providing a consistent and reliable way to manage application settings.
