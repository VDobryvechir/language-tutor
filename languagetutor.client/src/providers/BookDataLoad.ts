import { apiRequest } from "./ApiContext";
import { RepetitionModel } from "../models/RepetitionModel";
import { ChapterPositions } from "../models/ChapterPositions";
import { ChapterModel } from "../models/ChapterModel";

import { convertChapterModelToRepetitionModel, getLanguageOfStudy } from './StorageUtils';
const externalUrl = "https://www.sponsorschoose.org/norsk/cc.php";
const externalGet = "?id=";     

export const loadVerseResource = (resource: string, book: string, chapter: string): Promise<ChapterModel> => {
    const url = `/tutor/${resource}/${book}/${chapter}.json`;
    return apiRequest(url, "GET", null, {cache: true}); 
}

export const getExternalId = (resource: string, book: string): string => {
    const letter = resource.startsWith("b") ? "B" : "G";
    const lang = getLanguageOfStudy();
    return letter + lang + book;
};

export const loadAudioPositions = (resource: string, book: string, chapter: string): Promise<number[]> => {
    const url = externalUrl + externalGet + getExternalId(resource, book);
    return apiRequest(url).then((chapterPositions: ChapterPositions) => (chapterPositions || {})[chapter] || [])
}

export const saveAudioPositions = (resource: string, book: string, chapter: string, pos: number[]): Promise<void> => {
    const id = getExternalId(resource, book);
    let url = externalUrl + externalGet + id;
    return apiRequest(url).then((chapterPositions: ChapterPositions) => {
        url = externalUrl;
        chapterPositions = chapterPositions || {};
        chapterPositions[chapter] = pos;
        const data = encodeURIComponent(JSON.stringify(chapterPositions));
        const body = `id=${id}&d=${data}`;
        return apiRequest(url, "POST", body, {isForm: true});
    });
}

export const loadPartialRepetitionModel = (resource: string, book: string, chapter: string): Promise<Partial<RepetitionModel>> => {
    return Promise.all([loadVerseResource(resource, book, chapter), loadAudioPositions(resource, book, chapter)]).then(([model, pos]) => {
        return convertChapterModelToRepetitionModel(model, pos);
    })
}
