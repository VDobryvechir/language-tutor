export interface PerWordInfo {
    tr: { [key: string]: string };
}
export interface RepetitionOptions {
    repetitionNumber: number;
    delayBefore: number;
    delayAfter: number;
    delaySource: number;
    delayTranslation: number;
    showSourceAt: number;
    showTranslationAt: number;
    primaryLanguage: string;
    secondaryLanguage: string;
};
export interface RepetitionModel {
    sourceLanguage: string;
    sourceLines: string[];
    targetLanguages: string[];
    targetLines: string[][];
    activeLanguages: { [key: string]: boolean };
    useDictionary: boolean;
    audioSource: string;
    audioPositions: number[];
    shortLines: PerWordInfo[][];
    shortSource: PerWordInfo[];
    longLines: PerWordInfo[][];
    longSource: PerWordInfo[];
    options: RepetitionOptions;
    monoSourceLines?: string[];
};
