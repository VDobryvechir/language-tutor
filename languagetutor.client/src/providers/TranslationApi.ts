import { apiRequest } from "./ApiContext";
import { TranslationResponse } from "../models/TranslationResponse";

const translationUrl = "/api/translation";

export const executeTranslations = (srcLang: string, dstLang: string[], text: string[]): Promise<TranslationResponse[]> => {
    const body = {
        originalLanguage: srcLang,
        text: text,
        languages: dstLang,
    };
    return apiRequest(translationUrl, "POST", JSON.stringify(body));  
};
