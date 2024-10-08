import TranslationSource from '../../common/translation-source/TranslationSource';
import { RepetitionProps, addNewTargetTranslation } from '../../../providers/RepititionContext';
import Button from '@mui/material/Button';
import translate from '../../../i18n/translate';
import './RepititionTexts.css';
import { RepetitionModel } from '../../../models/RepetitionModel';
import { cleanRepetitionModelByTimeRemoving } from '../../../providers/TextProcessing';

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
