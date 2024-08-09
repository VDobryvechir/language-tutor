export interface ChapterModel {
    targetLanguages: string[];
    targetLines: string[][];
    audioSource: { [key: string]: string };
}