import LanguageChooser from '../language-chooser/LanguageChooser.tsx';
import TranslationText from '../translation-text/TranslationText.tsx';

interface Props {
    language: string;
    setLanguage: (lang: string) => void;
    lines: string[];
    setLines: (lines: string[]) => void;
    labelTitle: string;
    selectorLabel: string;

};
const TranslationSource = ({ language, setLanguage, lines, setLines, labelTitle, selectorLabel }: Props) => {
    return (
        <div>
            <LanguageChooser
                language={language}
                setLanguage={setLanguage}
                labelTitle={labelTitle}
                selectorLabel={selectorLabel}
            />
            <TranslationText lines={lines} setLines={setLines} />
        </div>
    )
};

export default TranslationSource;
