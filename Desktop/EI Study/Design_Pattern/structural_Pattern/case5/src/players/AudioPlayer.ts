import { IMediaPlayer } from "../interfaces/IMediaPlayer";
import { MediaAdapter } from "../adapters/MediaAdapter";
import { Logger } from "../services/Logger";

export class AudioPlayer implements IMediaPlayer {
  private logger: Logger = new Logger("AudioPlayer");
  private mediaAdapter: MediaAdapter | null = null;

  play(audioType: string, fileName: string): void {
    this.logger.info(`Playing ${audioType} file: ${fileName}`);

    // Built-in support for MP3 format
    if (audioType.toLowerCase() === "mp3") {
      console.log(`Playing MP3 file: ${fileName}`);
      return;
    }

    // Use adapter for other formats
    if (
      audioType.toLowerCase() === "vlc" ||
      audioType.toLowerCase() === "mp4"
    ) {
      this.mediaAdapter = new MediaAdapter(audioType);
      this.mediaAdapter.play(audioType, fileName);
      return;
    }

    console.log(`Invalid media. ${audioType} format not supported`);
  }
}
