import { GeneralFormField, generateGeneralFormDefaults } from '../components/common/general-form/GeneralFormModel';

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
    activeLanguages: string[];
    useDictionary: boolean;
    audioSource: string;
    audioPositions: number[];
    options: RepetitionOptions;
};

export const RepetitionOptionDefinition: GeneralFormField[] = [
    { 
        name: "Number of repetitions for each verse",
        field: "repetitionNumber",
        kind: "int",
        defValue: "1",
        minValue: 1,
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
    },
    {
        name: "After which repetition should the source text be shown",
        field: "showSourceAt",
        kind: "selectorNumber",
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
                valueFinish: "repetitionNumber"
            }
        ]
    },
    {
        name: "Additional delay for the source text",
        field: "delaySource",
        kind: "number",
    },
    {
        name: "After which repetition should the translation be shown",
        field: "showTranslationAt",
        kind: "selectorNumber",
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
                valueFinish: "repetitionNumber"
            }
        ]

    },
    {
        name: "Additional delay for the translation",
        field: "delayTranslation",
        kind: "number",
    },
    {
        name: "Primary translation language",
        field: "primaryLanguage",
        kind: "language",
        defValue: "en",
    },
    {
        name: "Secondary translation language",
        field: "secondaryLanguage",
        kind: "language",
        defValue: "uk",
    },
];
export interface RepetitionProps {
    repetitionModel: RepetitionModel;
    setRepetitionModel: (model: RepetitionModel) => void;
    fireAction?: (name: string) => void;
};

export const getInitialRepetitionModel = (): RepetitionModel => {
    const options: RepetitionOptions = generateGeneralFormDefaults({}, RepetitionOptionDefinition);

    const res: RepetitionModel = {
        sourceLanguage: 'nb',
        sourceLines: [],
        targetLanguages: [],
        targetLines: [],
        activeLanguages: ['nb', 'en', 'uk', 'de'],
        useDictionary: true,
        audioSource: '',
        audioPositions: [],
        options: options,
    };
    return res;
} 

const translationPriorities = ["nb", "en", "uk", "de", "pl", "nn", "it", "fr", "es", "sv", "da", "gr", "ru"];

const dictionariesExternal = {
    nb: "https://ordbokene.no/nno/bm,nn/$$$",
    nn: "https://ordbokene.no/nno/bm,nn/$$$",
    de: "https://www.duden.de/rechtschreibung/$$$",
};
const translationsExternal = {
    all: "https://translate.google.com/details?hl=no&sl=$$s$$&tl=$$t$$&text=$$$&op=translate",
    nn: "",
}
export const getLinkedHtml = (link: string, sourceText: string, targetPage: string): string => {
    let res = "", pos = 0, n = sourceText.length;
    while (pos < n && sourceText[pos] === ' ') { pos++; }
    const linkPos = link.indexOf("$$$");
    const linkBefore = link.substring(0, linkPos);
    const linkAfter = link.substring(linkPos + 3);


    const part1 = `<a target="${targetPage}" href="${linkBefore}`;
    const part2 = `${linkAfter}">`;
    const part3 = `</a> `;
    for (let i = pos; i < n; i++) {
        if (sourceText[i] === ' ') {
            const w = sourceText.substring(pos, i);
            res += part1 + encodeURIComponent(w) + part2 + w + part3;
            pos = i + 1;
            while (pos < n && sourceText[pos] === ' ') { pos++; }
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

export const getTranslationLink = (screen: string, srcLang: string, lang1: string, lang2: string, sourceText: string): string => {
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
    return getLinkedHtml(link, sourceText, "transl" + srcLang);
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

