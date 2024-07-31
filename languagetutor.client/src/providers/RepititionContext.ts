export interface RepetitionModel {
    sourceLanguage: string;
    sourceLines: string[];
    targetLanguages: string[];
    targetLines: string[][];
    activeLanguages: string[];
    useDictionary: boolean;
    audioSource: string;
    audioPositions: number[];
};

export interface RepetitionProps {
    repetitionModel: RepetitionModel;
    setRepetitionModel: (model: RepetitionModel) => void;
};

export const getInitialRepetitionModel = ():RepetitionModel => {
    const res: RepetitionModel = {
        sourceLanguage: 'nb',
        sourceLines: [],
        targetLanguages: [],
        targetLines: [],
        activeLanguages: ['nb', 'en', 'uk'],
        useDictionary: true,
        audioSource: '',
        audioPositions: [],
    };
    return res;
} 

const translationPriorities = ["nb", "en", "uk", "de", "pl", "nn", "it", "fr", "es", "sv", "da", "gr", "ru"];


export const addNewTargetTranslation = (model: RepetitionModel): RepetitionModel => {
    const usedLangs = {};
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
