import { IMediaPlayer } from "../interfaces/IMediaPlayer";
export declare class MediaAdapter implements IMediaPlayer {
    private advancedMusicPlayer;
    private logger;
    constructor(audioType: string);
    play(audioType: string, fileName: string): void;
}
//# sourceMappingURL=MediaAdapter.d.ts.map