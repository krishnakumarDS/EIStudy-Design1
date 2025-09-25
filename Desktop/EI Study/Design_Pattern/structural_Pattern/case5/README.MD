# Adapter Pattern - Media Player System

## Description

This project demonstrates the Adapter structural design pattern through a media player system. The Adapter pattern allows objects with incompatible interfaces to collaborate. It acts as a bridge between two incompatible interfaces, enabling them to work together that otherwise couldn't due to incompatible interfaces.

In this implementation, the `AudioPlayer` class can play MP3 files directly, but uses the `MediaAdapter` to play other formats (VLC, MP4) by adapting the interfaces of advanced media players. This allows the client code to work with a unified interface (`IMediaPlayer`) regardless of the actual media format being played.

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

1. **Adapter Pattern Implementation**:

   - `AudioPlayer` implements the `IMediaPlayer` interface and handles MP3 files directly
   - `MediaAdapter` implements `IMediaPlayer` but internally uses `IAdvancedMediaPlayer` objects
   - `VlcPlayer` and `Mp4Player` implement the `IAdvancedMediaPlayer` interface
   - The adapter allows incompatible interfaces to work together seamlessly

2. **Input Validation**:

   - Validates that file names are not empty and don't contain invalid characters
   - Validates that user choices are within the allowed options
   - Provides meaningful error messages for invalid inputs

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
adapter-pattern-media-player/
├── src/
│   ├── interfaces/
│   │   ├── IMediaPlayer.ts
│   │   └── IAdvancedMediaPlayer.ts
│   ├── players/
│   │   ├── AudioPlayer.ts
│   │   ├── VlcPlayer.ts
│   │   └── Mp4Player.ts
│   ├── adapters/
│   │   └── MediaAdapter.ts
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

## Adapter Pattern Implementation

### Components

1. **Target Interface (IMediaPlayer)**:

   - Defines the interface that the client code expects
   - Includes a `play` method that takes audio type and file name

2. **Adapter (MediaAdapter)**:

   - Implements the target interface (`IMediaPlayer`)
   - Internally uses an instance of the adaptee interface (`IAdvancedMediaPlayer`)
   - Translates calls from the target interface to the adaptee interface

3. **Adaptee Interface (IAdvancedMediaPlayer)**:

   - Defines the interface of the existing system that needs adapting
   - Includes specific methods for different media formats (playVlc, playMp4)

4. **Concrete Adaptees**:

   - `VlcPlayer`: Implements the adaptee interface for VLC files
   - `Mp4Player`: Implements the adaptee interface for MP4 files

5. **Client (AudioPlayer)**:

   - Works with objects through the target interface
   - Can handle some requests directly (MP3 files)
   - Delegates other requests to the adapter (VLC, MP4 files)

6. **Services**:
   - **Logger**: Handles logging throughout the application
   - **InputValidator**: Validates user inputs
   - **ErrorHandler**: Manages error handling and recovery

### How It Works

1. The application starts with an `AudioPlayer` instance
2. Users can:
   - Play media files in different formats (MP3, VLC, MP4)
   - View supported formats
   - Exit the application
3. When playing media:
   - For MP3 files, the `AudioPlayer` handles them directly
   - For VLC or MP4 files, the `AudioPlayer` creates a `MediaAdapter`
   - The `MediaAdapter` instantiates the appropriate advanced player (VlcPlayer or Mp4Player)
   - The adapter translates the call to the appropriate method on the advanced player
4. The client code remains unaware of the adaptation process, working with a unified interface

## Expected Output

When you run the application, you'll see output similar to this:

```
=== Media Player ===
1. Play Media
2. Supported Formats
3. Exit
Enter your choice (1-3): 1

=== Play Media ===
Available formats:
1. MP3
2. VLC
3. MP4
Select format (1-3): 1
Enter file name: song.mp3

Playing media...
Playing MP3 file: song.mp3

=== Media Player ===
1. Play Media
2. Supported Formats
3. Exit
Enter your choice (1-3): 1

=== Play Media ===
Available formats:
1. MP3
2. VLC
3. MP4
Select format (1-3): 2
Enter file name: movie.vlc

Playing media...
Playing VLC file: movie.vlc

=== Media Player ===
1. Play Media
2. Supported Formats
3. Exit
Enter your choice (1-3): 1

=== Play Media ===
Available formats:
1. MP3
2. VLC
3. MP4
Select format (1-3): 3
Enter file name: video.mp4

Playing media...
Playing MP4 file: video.mp4
```

This implementation demonstrates the Adapter pattern in a clean TypeScript console application with robust input validation and error handling. The pattern allows integrating new components without changing existing code, promoting the Open/Closed Principle and making the system more flexible and maintainable.
