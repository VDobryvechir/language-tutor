import { AudioTextBlock } from "../models/AudioTextBlock";
import { apiRequest } from "./ApiContext";
import { RepetitionModel } from "../models/RepetitionModel";
import { AudioTextData } from "../models/AudioTextData";

export const downloadMedia = (url: string, method: string, body: any, fileName: string): Promise<void> => {
    return apiRequest(url, method, body, { isBlob: true }).then((blob: any) => {
        const linkUrl = window.URL.createObjectURL(new Blob([blob]));

        const link = document.createElement('a');
        link.href = linkUrl;
        link.download = fileName;

        document.body.appendChild(link);

        link.click();

        link.parentNode!.removeChild(link);
    });
}

export const uploadMedia = (url: string, method: string, body: any): Promise<any> => {
    return apiRequest(url, method, body).then((res: any) => {
        return res;
    });
};

export const convertToAudioTextBlocks = (model: RepetitionModel): AudioTextBlock[] => {
    const res: AudioTextBlock[] = [];
    res.push({ language: model.sourceLanguage, text: model.sourceLines });
    const n = model.targetLanguages.length;
    for (let i = 0; i < n; i++) {
        res.push({ language: model.targetLanguages[i], text: model.targetLines[i] });
    }
    return res;
}; 

export const extractAudioTextData = (payload: AudioTextData, model: RepetitionModel): RepetitionModel | null => {
    if (!payload || !payload.data?.length || !payload.data[0] || !payload.data[0].language) {
        return null;
    }
    const targetLanguages: string[] = [];
    const targetLines: string[][] = [];
    const n = payload.data.length;
    for (let i = 1; i < n; i++) {
        const d = payload.data[i];
        targetLanguages.push(d.language);
        targetLines.push(d.text);
    }
    return {
        ...model,
        audioSource: payload.audio || "",
        audioPositions: payload.positions || [],
        sourceLanguage: payload.data[0].language,
        sourceLines: payload.data[0].text || [],
        targetLanguages: targetLanguages,
        targetLines: targetLines,
    }
} 
