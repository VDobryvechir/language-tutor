import { GeneralFormField, generateGeneralFormDefaults } from '../components/common/general-form/GeneralFormModel';

export interface RepetitionOptions {
    repetitionNumber: number;
    delayBefore: number;
    delayAfter: number;
    delaySource: number;
    delayTranslation: number;
    showSourceAt: number;
    showTranslationAt: number;
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
        kind: "number",
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

