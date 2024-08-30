import { PerWordInfo } from './RepetitionModel';

export interface ChapterModel {
    targetLanguages: string[];
    targetLines: string[][];
    audioSource: { [key: string]: string };
    audioPositions: { [key: string]: number[] };
    shortLines: PerWordInfo[][];
    longLines: PerWordInfo[][];
}