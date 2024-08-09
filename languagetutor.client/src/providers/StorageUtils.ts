import { ChapterModel } from '../models/ChapterModel';
import { RepetitionModel } from '../models/RepetitionModel';

export const getLanguageOfStudy = () => localStorage.getItem('lang') || 'nb';

export const setLanguageOfStudy = (lng: string) => localStorage.setItem('lang', lng);

export const getActiveLanguagesAsArray = () => {
    const s = (localStorage.getItem('activeLanguages') || "").split(",");
    return s.length && s[0] ? s : ['nb', 'en', 'uk', 'de', 'pl'];
}

export const setActiveLanguagesAsArray = (langs: string[]) => {
    localStorage.setItem('activeLanguages', (langs || []).join(","));
}

export const convertChapterModelToRepetitionModel = (chapterModel: ChapterModel, audioPositions: number[]): Partial<RepetitionModel> => {
    const lng = getLanguageOfStudy();
    const pos = chapterModel.targetLanguages.findIndex((item: string) => item === lng);
    if (pos < 0) {
        throw Error("No language support");
    }
    const targetLines = chapterModel.targetLines.slice();
    targetLines.splice(pos, 1);
    const targetLanguages = chapterModel.targetLanguages.slice();
    targetLanguages.splice(pos, 1);
    const audioSource: string = chapterModel.audioSource && chapterModel.audioSource[lng] || "";

    const model: Partial<RepetitionModel> = {
        sourceLanguage: lng,
        sourceLines: chapterModel.targetLines[pos],
        targetLanguages: targetLanguages,
        targetLines: targetLines,
        audioPositions: audioPositions || [],
        audioSource: audioSource,
    };
    return model;
};
