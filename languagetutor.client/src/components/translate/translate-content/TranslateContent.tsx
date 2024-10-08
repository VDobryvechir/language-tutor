import React from 'react';
import translate from '../../../i18n/translate.tsx';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TranslationSource from '../../common/translation-source/TranslationSource.tsx';
import { getLanguageOfStudy, getActiveLanguagesAsArray } from '../../../providers/StorageUtils';
import LanguageMultiset from '../../common/language-multiset/LanguageMultiset.tsx';
import { executeTranslations } from '../../../providers/TranslationApi.ts';
import { TranslationResponse } from '../../../models/TranslationResponse.ts';
import './TranslateContent.css';

const TranslateContent = () => {
    const [origin, setOrigin] = React.useState(getLanguageOfStudy());
    const [lines, setLines] = React.useState(['']);
    const [destLanguages, setDestLanguages] = React.useState(getActiveLanguagesAsArray());
    const [product, setProduct] = React.useState([] as TranslationResponse[]);

    const makeTranslation = () => {
        if (!destLanguages || !destLanguages.length || !lines || !lines.length || !origin) {
            console.log("No data to proceed");
        }
        executeTranslations(origin, destLanguages, lines).then((data: TranslationResponse[]) => {
            console.log(data);
            if (data && data.length) {
                setProduct(data);
            } else {
                setProduct([]);
            }
        });
    }; 
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
                            {item.text.map((line) => (
                                <div dangerouslySetInnerHTML={{ __html: line }}></div>
                            ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Box>
        </div>
    ); 
};

export default TranslateContent;