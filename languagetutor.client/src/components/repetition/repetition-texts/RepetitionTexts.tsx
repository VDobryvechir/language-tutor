import TranslationSource from '../../common/translation-source/TranslationSource';
import { RepetitionProps, addNewTargetTranslation } from '../../../providers/RepititionContext';
import Button from '@mui/material/Button';
import translate from '../../../i18n/translate';
import './RepititionTexts.css';
import { RepetitionModel } from '../../../models/RepetitionModel';
import { cleanRepetitionModelByTimeRemoving, copyFirstPortion, pasteTextFromClipboard, separateTextToLines } from '../../../providers/TextProcessing';
import { showInfo, showError } from '../../../providers/Notifier';

const RepetitionTexts = ({ repetitionModel, setRepetitionModel }: RepetitionProps) => {
    const refineText = (model: RepetitionModel): RepetitionModel => {
        return cleanRepetitionModelByTimeRemoving(model);
    };
    const setSourceLanguage = (lang: string) => {
        setRepetitionModel({
            ...repetitionModel,
            sourceLanguage: lang,
        });
    };
    const setSourceLines = (lines: string[]) => {
        setRepetitionModel({
            ...repetitionModel,
            sourceLines: lines,
        });
    };
    const setTargetLanguage = (index: number) => {
        return (lng: string) => {
            const targetLanguages = (repetitionModel.targetLanguages || []).slice();
            targetLanguages[index] = lng;
            setRepetitionModel({
                ...repetitionModel,
                targetLanguages: targetLanguages,
            });
        };
    };
    const setTargetLines = (index: number) => {
        return (lines: string[]) => {
            const targetLines = (repetitionModel.targetLines || []).slice();
            targetLines[index] = lines || [];
            setRepetitionModel({
                ...repetitionModel,
                targetLines: targetLines,
            });
        };
    };
    const pasteToLastLanguage = () => {
        pasteTextFromClipboard((t: string) => {
            const n = repetitionModel.targetLines?.length - 1;
            if (t && n>=0) {
                const newPortion = separateTextToLines(t);
                const newLen = newPortion.length;
                if (newLen > 0) {
                    const targetLines = (repetitionModel.targetLines || []).slice();
                    targetLines[n] = (targetLines[n] || []).concat(newPortion);
                    const targLen = targetLines[n].length;
                    const srcLen = repetitionModel.sourceLines?.length || 0;
                    const diff = srcLen - targLen;
                    setRepetitionModel({
                        ...repetitionModel,
                        targetLines: targetLines,
                    });
                    if (diff === 0) {
                        showInfo(`Added ${newLen} lines. Done with total of ${srcLen}`);
                    } else if (diff > 0) {
                        showInfo(`Added ${newLen} lines. ${diff} left`);
                    } else {
                        showError(`Added ${newLen} but overhead is ${-diff}`);
                    }
                }
            }
        });
    };
    return (
        <>
            <TranslationSource
                language={repetitionModel.sourceLanguage}
                setLanguage={setSourceLanguage}
                labelTitle="Source"
                selectorLabel="From language"
                lines={repetitionModel.sourceLines}
                setLines={setSourceLines}
            />
            <div className="repetition-texts__translation-bar">
                <div className="repetition-texts__translations">{translate("Translations")}</div>
                <Button
                    variant="outlined"
                    onClick={ () => setRepetitionModel(addNewTargetTranslation(repetitionModel))}
                >{translate("Add translation")}</Button>
                <Button
                    variant="outlined"
                    onClick={() => setRepetitionModel(refineText(repetitionModel))}
                >{translate("Refine text")}</Button>
                <Button
                    variant="outlined"
                    onClick={() => copyFirstPortion(repetitionModel.sourceLines, repetitionModel.targetLines[repetitionModel.targetLines.length-1].length, 5000)}
                >{translate("Copy")} &lt;5000</Button>
                <Button
                    variant="outlined"
                    onClick={() => pasteToLastLanguage()}
                >{translate("Paste")}</Button>
            </div>
            {
                repetitionModel.targetLanguages.map((lng, index) => (
                    <div key={index} className="repetition-texts__translation-target">
                    <TranslationSource
                        language={lng}
                        setLanguage={setTargetLanguage(index)}
                        labelTitle="Target"
                        selectorLabel="Into language"
                        lines={repetitionModel.targetLines[index]}
                        setLines={setTargetLines(index)}
                        />
                    </div>
                ))
            }
        </>
    );
};

export default RepetitionTexts;
