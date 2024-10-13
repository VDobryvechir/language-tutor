import { apiRequest } from "./ApiContext";
import { TranslationResponse } from "../models/TranslationResponse";

interface TranslationBlock {
    [key: string]: Promise<TranslationResponse[]> | TranslationResponse[]; 
}
interface TranslationCache {
    [key: string]: TranslationBlock;
}
const translationUrl = "/api/translation";
const translationCache: TranslationCache = {};

export const executeTranslations = (srcLang: string, dstLang: string[], text: string[]): Promise<TranslationResponse[]> => {
    const body = {
        originalLanguage: srcLang,
        text: text,
        languages: dstLang,
    };
    return apiRequest(translationUrl, "POST", JSON.stringify(body));  
};

export const executeCachedTranslation = (srcLang: string, dstLang: string[], text: string): Promise<TranslationResponse[]> => {
   const key = srcLang + dstLang.join("_");
   let translationBlock = translationCache[key];
   if (!translationBlock) {
       translationBlock = {};
       translationCache[key] = translationBlock;
   }
   if (translationBlock[text]) {
       if (translationBlock[text] instanceof Promise) {
           return translationBlock[text] as Promise<TranslationResponse[]>;   
       }
       return Promise.resolve(translationBlock[text]);
   }
   translationBlock[text] = executeTranslations(srcLang, dstLang, [text]).then((data)=> translationBlock[text]=data);
    return translationBlock[text] as Promise<TranslationResponse[]>;
};

export const executeTranslationsForSingleLanguage = (srcLang: string, dstLang: string, text: string[]): Promise<string[]> => {
    return executeTranslations(srcLang, [dstLang], text).then((res: TranslationResponse[]) => res[0].text);
}
