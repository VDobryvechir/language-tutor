import translate from '../../../i18n/translate.tsx';
import InputLabel from '@mui/material/InputLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { ALL_LOCALES } from '../../../i18n/locales.ts';
import './LanguageMultiset.css';
interface Props {
    label?: string;
    languages: string[];
    setLanguages: (lang: string[]) => void;
};

const LanguageMultiset = ({ languages, setLanguages, label }: Props) => {
    const turnOn = (locale: string) => {
        const pos = (languages || []).findIndex((item)=> item===locale);
        if (pos >= 0) {
            return;
        }
        setLanguages(languages.concat([locale]));
    };
    const turnOff = (locale: string) => {
        const pos = (languages || []).findIndex((item) => item === locale);
        if (pos < 0) {
            return;
        }
        setLanguages(languages.slice(0, pos).concat(languages.slice(pos + 1)));
    };
    const turnOffOn = (state: boolean, locale: string) => {
        state ? turnOn(locale) : turnOff(locale);
    };
    const isLangUsed: {[key:string]: boolean} = {};
    (languages || []).forEach((lng) => isLangUsed[lng] = true);
    const langList = ALL_LOCALES.map((locale: string) => {
        const swch = isLangUsed[locale] || false;
        return (
            <FormControlLabel control={<Switch checked={swch} onChange={(event) => turnOffOn(event.target.checked, locale)} />} label={translate(locale)} key={locale} />
        );
    });
    return (
        <FormGroup>
            <InputLabel id="origin-language-label">{label && translate(label)}</InputLabel>
            <div className="language-multiset__list">
                {langList}
            </div>
        </FormGroup>
    );
};

export default LanguageMultiset;
