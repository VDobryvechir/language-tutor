import React from 'react';
import translate from '../../../i18n/translate.tsx';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TranslationSource from '../../common/translation-source/TranslationSource.tsx';
import { getLanguageOfStudy, getActiveLanguagesAsArray } from '../../../providers/StorageUtils';
import LanguageMultiset from '../../common/language-multiset/LanguageMultiset.tsx';
import { executeTranslations } from '../../../providers/TranslationApi.ts';
import { TranslationResponse } from '../../../models/TranslationResponse.ts';
import './TranslateContent.css';
import { ComprehensiveResponse } from '../../../models/ComprehensiveResponse.ts';
import DictionaryDialog from '../../common/dictionary-dialog/DictionaryDialog';
import { WordDictionary } from '../../../models/WordDictionary';
import { convertToLangFilter } from '../../../providers/LanguageUtils.ts';

const TranslateContent = () => {
    const [origin, setOrigin] = React.useState(getLanguageOfStudy());
    const [lines, setLines] = React.useState(['']);
    const [destLanguages, setDestLanguages] = React.useState(getActiveLanguagesAsArray());
    const [product, setProduct] = React.useState([] as TranslationResponse[]);
    const [dictionary, setDictionary] = React.useState({} as WordDictionary);
    const [word, setWord] = React.useState("");

    const makeTranslation = () => {
        if (!destLanguages || !destLanguages.length || !lines || !lines.length || !origin) {
            console.log("No data to proceed");
        }
        executeTranslations(origin, destLanguages, lines).then((entry: ComprehensiveResponse) => {
            if (entry?.lines?.length) {
                setProduct(entry.lines);
            } else {
                setProduct([]);
            }
            if (entry?.words) {
                setDictionary(entry.words);
            }
        });
    }; 
    const showDialog = (ev: any) => {
        const ord = (ev?.target ? ev.target.innerText : "").trim();
        if (ord && dictionary) {
            setWord(ord);
        }
        console.log(ord);
    };
    const voidCall = () => { };
    const langFilter = convertToLangFilter(destLanguages);
    return (
        <div className="translate-content">
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <LanguageMultiset label="Translate into" languages={destLanguages} setLanguages={ setDestLanguages} />                   
                </div>
                <TranslationSource
                    language={origin}
                    setLanguage={(lang: string) => setOrigin(lang)}
                    labelTitle="Source"
                    selectorLabel="From language"
                    lines={lines}
                    setLines={setLines }
                />
                <div>
                    <Button variant="outlined" onClick={makeTranslation }>{translate("Translate")}</Button>
                </div>
            </Box>
            <Box>
                <div>
                    {product.map((item: TranslationResponse) => (
                        <div key={item.language} className="translate-content__product">
                            <div className="translate-content__product-lang">
                                { translate(item.language) }
                            </div>
                            <div> 
                                {item.text.map((line: string, index: number) => (
                                    <div onClick={item.language===origin ? showDialog : voidCall} dangerouslySetInnerHTML={{ __html: line }} key={item.language + index}></div>
                            ))}
                            </div>
                        </div>
                    ))}
                    <DictionaryDialog lang={origin} open={!!word} word={word} entry={word && dictionary && dictionary[word.toLowerCase()] || {}} langFilter={langFilter} onClose={() => setWord("")}></DictionaryDialog>
                </div>
            </Box>
        </div>
    ); 
};

export default TranslateContent;