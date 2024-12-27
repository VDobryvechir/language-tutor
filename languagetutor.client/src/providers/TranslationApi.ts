import { apiRequest } from "./ApiContext";
import { ComprehensiveResponse } from "../models/ComprehensiveResponse";

interface TranslationBlock {
    [key: string]: Promise<ComprehensiveResponse> | ComprehensiveResponse; 
}
interface TranslationCache {
    [key: string]: TranslationBlock;
}
const translationUrl = "/api/word";
const translationCache: TranslationCache = {};

export const executeTranslations = (srcLang: string, dstLang: string[], text: string[]): Promise<ComprehensiveResponse> => {
    const body = {
        originalLanguage: srcLang,
        text: text,
        languages: dstLang,
    };
    return apiRequest(translationUrl, "POST", JSON.stringify(body));  
};

export const executeCachedTranslation = (srcLang: string, dstLang: string[], text: string): Promise<ComprehensiveResponse> => {
   const key = srcLang + dstLang.join("_");
   let translationBlock = translationCache[key];
   if (!translationBlock) {
       translationBlock = {};
       translationCache[key] = translationBlock;
   }
   if (translationBlock[text]) {
       if (translationBlock[text] instanceof Promise) {
           return translationBlock[text] as Promise<ComprehensiveResponse>;   
       }
       return Promise.resolve(translationBlock[text]);
   }
   translationBlock[text] = executeTranslations(srcLang, dstLang, [text]).then((data)=> translationBlock[text]=data);
    return translationBlock[text] as Promise<ComprehensiveResponse>;
};

export const executeTranslationsForSingleLanguage = (srcLang: string, dstLang: string, text: string[]): Promise<string[]> => {
    return executeTranslations(srcLang, [dstLang], text).then((res: ComprehensiveResponse) => res?.lines && res.lines[0].text || [""]);
}
