# Factory Method Pattern - Document Creator System

## Description

This project demonstrates the Factory Method creational design pattern through a document creation system. The Factory Method pattern provides an interface for creating objects in a superclass but allows subclasses to alter the type of objects that will be created.

In this implementation, the `IDocumentCreator` interface declares the factory method (`createDocument`), and concrete creators (`PdfDocumentCreator`, `WordDocumentCreator`, `ExcelDocumentCreator`) implement this method to create specific types of documents. This allows the system to create different document types without specifying the exact class of document that will be created.

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

1. **Factory Method Pattern Implementation**:

   - Abstract creator interface (`IDocumentCreator`) declares the factory method
   - Concrete creators (`PdfDocumentCreator`, `WordDocumentCreator`, `ExcelDocumentCreator`) implement the factory method
   - Each creator is responsible for creating a specific type of document

2. **Input Validation**:

   - Validates that document title and body are not empty
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
factory-method-document-creator/
├── src/
│   ├── interfaces/
│   │   ├── IDocument.ts
│   │   └── IDocumentCreator.ts
│   ├── models/
│   │   ├── DocumentType.ts
│   │   └── DocumentContent.ts
│   ├── documents/
│   │   ├── PdfDocument.ts
│   │   ├── WordDocument.ts
│   │   └── ExcelDocument.ts
│   ├── creators/
│   │   ├── PdfDocumentCreator.ts
│   │   ├── WordDocumentCreator.ts
│   │   └── ExcelDocumentCreator.ts
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

## Factory Method Pattern Implementation

### Components

1. **Product Interface (IDocument)**:

   - Defines the interface for all document objects
   - Includes methods for creating, opening, saving, and printing documents

2. **Concrete Products**:

   - **PdfDocument**: Represents a PDF document
   - **WordDocument**: Represents a Word document
   - **ExcelDocument**: Represents an Excel document

3. **Creator Interface (IDocumentCreator)**:

   - Declares the factory method (`createDocument`) that returns a product object
   - May include default implementations of other methods that operate on products

4. **Concrete Creators**:

   - **PdfDocumentCreator**: Implements the factory method to create PDF documents
   - **WordDocumentCreator**: Implements the factory method to create Word documents
   - **ExcelDocumentCreator**: Implements the factory method to create Excel documents

5. **Models**:

   - **DocumentContent**: Represents the content of a document (title, body, author)
   - **DocumentType**: Enum defining different types of documents

6. **Services**:
   - **Logger**: Handles logging throughout the application
   - **InputValidator**: Validates user inputs
   - **ErrorHandler**: Manages error handling and recovery

### How It Works

1. The application starts and presents a menu to the user
2. Users can:
   - Create a new document by selecting a document type
   - Provide document details (title, body, author)
   - Perform actions on the created document (open, save, print)
   - Exit the application
3. When creating a document:
   - The user selects a document type (PDF, Word, Excel)
   - The corresponding creator is instantiated
   - The creator's factory method is called to create the document
   - The document is initialized with the provided content
4. The user can then perform actions on the created document, which are delegated to the document object

## Expected Output

When you run the application, you'll see output similar to this:

```
=== Document Creator System ===
1. Create Document
2. Exit
Enter your choice (1-2): 1

=== Create Document ===
Select document type:
1. PDF
2. Word
3. Excel
Enter your choice (1-3): 1
Enter document title: My PDF Document
Enter document body: This is the content of my PDF document.
Enter author name (optional): John Doe

Document created successfully using PDF Creator
Document type: PDF

=== Document Actions ===
1. Open Document
2. Save Document
3. Print Document
4. Back to Main Menu
Enter your choice (1-4): 1
Opening PDF: My PDF Document by John Doe

=== Document Actions ===
1. Open Document
2. Save Document
3. Print Document
4. Back to Main Menu
Enter your choice (1-4): 2
Saving PDF: My PDF Document to documents/

=== Document Actions ===
1. Open Document
2. Save Document
3. Print Document
4. Back to Main Menu
Enter your choice (1-4): 3
Printing PDF: My PDF Document

=== Document Actions ===
1. Open Document
2. Save Document
3. Print Document
4. Back to Main Menu
Enter your choice (1-4): 4
```

This implementation demonstrates the Factory Method pattern in a clean TypeScript console application with robust input validation and error handling. The pattern allows a class to delegate instantiation to its subclasses, promoting loose coupling and adhering to the Open/Closed Principle.
