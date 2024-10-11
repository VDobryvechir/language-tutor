import { GeneralFormField, generateGeneralFormDefaults } from '../components/common/general-form/GeneralFormModel';
import { RepetitionModel, RepetitionOptions } from '../models/RepetitionModel';
import { getLanguageOfStudy, getActiveLanguagesAsMap } from './StorageUtils';

export const RepetitionOptionDefinition: GeneralFormField[] = [
    { 
        name: "Number of repetitions for each verse",
        field: "repetitionNumber",
        kind: "int",
        defValue: "1",
        minValue: 1,
        storageForDefault: "session",
    },
    {
        name: "Delay before each verse in seconds",
        field: "delayBefore",
        kind: "number",
    },
    {
        name: "Delay after each verse in seconds",
        field: "delayAfter",
        kind: "number",
        storageForDefault: "session",
    },
    {
        name: "After which repetition should the source text be shown",
        field: "showSourceAt",
        kind: "selectorNumber",
        storageForDefault: "session",
        options: [
            {
                name: "immediately",
                value: "0",
                isDefault: true,
            },
            {
                name: "never automatically, show only by clicking or key pressing",
                value: "-1",
            },
        ],
        generatedOptions: [
            {
                name: "after n repetitions",
                valueStart: "1",
                valueFinish: "repetitionNumber",
                maxFinish: 20,
            }
        ]
    },
    {
        name: "Additional delay for the source text",
        field: "delaySource",
        kind: "number",
        storageForDefault: "session",
    },
    {
        name: "After which repetition should the translation be shown",
        field: "showTranslationAt",
        kind: "selectorNumber",
        storageForDefault: "session",
        options: [
            {
                name: "immediately",
                value: "0",
                isDefault: true,
            },
            {
                name: "never automatically, show only by clicking or key pressing",
                value: "-1",
            },
        ],
        generatedOptions: [
            {
                name: "after n repetitions",
                valueStart: "1",
                valueFinish: "repetitionNumber",
                maxFinish: 20,
            }
        ]

    },
    {
        name: "Additional delay for the translation",
        field: "delayTranslation",
        kind: "number",
        storageForDefault: "session",
    },
    {
        name: "Primary translation language",
        field: "primaryLanguage",
        kind: "language",
        storageForDefault: "local",
        defValue: "en",
    },
    {
        name: "Secondary translation language",
        field: "secondaryLanguage",
        kind: "language",
        storageForDefault: "local",
        defValue: "uk",
    },
];
export interface RepetitionProps {
    repetitionModel: RepetitionModel;
    setRepetitionModel: (model: RepetitionModel) => void;
    fireAction?: (name: string) => void;
    saveAudioPositions?: (pos: number[]) => void;
    startTab?: number;
    initVerse?: number;
    baseName?: string;
};
export const getInitialRepetitionModel = (params: Partial<RepetitionModel>): RepetitionModel => {
    const options: RepetitionOptions = generateGeneralFormDefaults({}, RepetitionOptionDefinition);
    params = params || {};
    const res: RepetitionModel = {
        sourceLanguage: params.sourceLanguage || getLanguageOfStudy(),
        sourceLines: params.sourceLines || [],
        targetLanguages: params.targetLanguages || [],
        targetLines: params.targetLines || [],
        activeLanguages: getActiveLanguagesAsMap(),
        useDictionary: true,
        audioSource: params.audioSource || '',
        audioPositions: params.audioPositions || [],
        options: options,
        shortLines: params.shortLines || [],
        shortSource: params.shortSource || [],
        longLines: params.longLines || [],
        longSource: params.longSource || [],
    };
    return res;
} 

const translationPriorities = ["nb", "en", "uk", "de", "pl", "nn", "it", "fr", "es", "sv", "da", "gr", "ru"];

const dictionariesExternal: {[key:string]: string} = {
    nb: "https://ordbokene.no/nno/bm,nn/$$$",
    nn: "https://ordbokene.no/nno/bm,nn/$$$",
    de: "https://www.duden.de/rechtschreibung/$$$",
};
const translationsExternal = {
    all: "https://translate.google.com/details?hl=no&sl=$$s$$&tl=$$t$$&text=$$$&op=translate",
    nn: "",
};
export const getLinkPartsWithTarget = (link: string, targetPage: string): string[] => {
    const linkPos = link.indexOf("$$$");
    const linkBefore = link.substring(0, linkPos);
    const linkAfter = link.substring(linkPos + 3);
    const part1 = `<a target="${targetPage}" href="${linkBefore}`;
    const part2 = `${linkAfter}">`;
    const part3 = `</a>`;
    return [part1, part2, part3];
};

export const getLinkedHtml = (link: string, sourceText: string, targetPage: string): string => {
    let res = "", pos = 0, n = sourceText.length;
    while (pos < n && (sourceText[pos] === ' ' || sourceText[pos] === '.' || sourceText[pos] === ',')) { pos++; }
    if (pos > 0) {
        res += sourceText.substring(0, pos);
    }
    const [part1, part2, part3] = getLinkPartsWithTarget(link, targetPage);
    for (let i = pos; i < n; i++) {
        const c = sourceText[i]; 
        if (c === ' ' || c=== '.' || c===',') {
            const w = sourceText.substring(pos, i);
            res += part1 + encodeURIComponent(w) + part2 + w + part3;
            pos = i;
            while (pos < n && (sourceText[pos] === ' ' || sourceText[pos] === '.' || sourceText[pos] === ',')) {
                res += sourceText[pos];
                pos++;
            }
            i = pos;
        }
    }
    if (pos < n) {
        const w = sourceText.substring(pos);
        res += part1 + encodeURIComponent(w) + part2 + w + part3;
    }
    return res;
};

export const getDictionaryLinks = (lang: string, sourceText: string): string => {
    const link = dictionariesExternal[lang];
    if (!link) {
        return "";
    }
    const target = "diction" + lang;
    return getLinkedHtml(link, sourceText, target);
};

export const extractDoubleQuoteAttribute = (txt: string, attr: string): string => {
    attr += '="';
    let pos = txt.indexOf(attr);
    if (pos < 0) {
        return "";
    }
    txt = txt.substring(pos + attr.length);
    pos = txt.indexOf('"');
    if (pos >= 0) {
        txt = txt.substring(0, pos);
    } 
    return txt;
};

export const getTranslationLink = (screen: string, srcLang: string, lang1: string, lang2: string, sourceText: string, isWhole: string = ''): string => {
    if (srcLang === "nb" || srcLang === "nn") srcLang = "no";
    if (lang1 === "nb" || lang1 === "nn") lang1 = "no";
    if (lang2 === "nb" || lang2 === "nn") lang2 = "no";

    let tLang = srcLang === lang1 ? lang2 : lang1;
    if (!tLang || tLang === srcLang) {
        return sourceText;
    }
    let link = translationsExternal.all.replace("$$s$$", srcLang).replace("$$t$$", tLang);
    if (screen && screen!=='nb' && screen!=='nn') {
        link = link.replace("hl=no", "hl=" + screen);
    }
    const targetPage = "transl" + srcLang;
    if (isWhole) {
        const [part1, part2, part3] = getLinkPartsWithTarget(link, targetPage);
        let res = part1 + encodeURIComponent(sourceText) + part2 + isWhole + part3;
        if (isWhole === "href") {
            res = extractDoubleQuoteAttribute(res, "href");
        }
        return res;
    }
    return getLinkedHtml(link, sourceText, targetPage);
};

export const addNewTargetTranslation = (model: RepetitionModel): RepetitionModel => {
    const usedLangs: { [key: string]: number } = {};
    if (model.sourceLanguage) {
        usedLangs[model.sourceLanguage] = 1;
    }
    if (model.targetLanguages) {
        model.targetLanguages.forEach((lng: string) => usedLangs[lng] = 1);
    }
    let lng = "en";
    for (let i = 0; i < translationPriorities.length; i++) {
        if (!usedLangs[translationPriorities[i]]) {
            lng = translationPriorities[i];
            break;
        }
    }
    const targetLanguages = (model.targetLanguages || []).slice();
    targetLanguages.push(lng);
    const targetLines = (model.targetLines || []).slice();
    targetLines.push([]);
    const newModel: RepetitionModel = {
        ...model,
        targetLanguages: targetLanguages,
        targetLines: targetLines,
    }
    return newModel;
}

export const clearAudioPositions = (model: RepetitionModel): RepetitionModel => {
    const n = (model.sourceLines || []).length; 
    const audioPositions = Array(n).fill(0);
    return {
        ...model,
        audioPositions: audioPositions,
    };
}

export const extractSaveablePayload = (model: RepetitionModel, origin: RepetitionModel): RepetitionModel => {
    return {
        ...origin,
        audioSource: model.audioSource,
        audioPositions: model.audioPositions,
        sourceLanguage: model.sourceLanguage,
        sourceLines: model.sourceLines,
        targetLanguages: model.targetLanguages,
        targetLines: model.targetLines,
    };
};

