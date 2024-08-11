import React from 'react';
import translate from '../../../i18n/translate.tsx';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TranslationSource from '../../common/translation-source/TranslationSource.tsx';
import { getLanguageOfStudy, getActiveLanguagesAsArray } from '../../../providers/StorageUtils';
import LanguageMultiset from '../../common/language-multiset/LanguageMultiset.tsx';

const TranslateContent = () => {
    const [origin, setOrigin] = React.useState(getLanguageOfStudy());
    const [lines, setLines] = React.useState(['']);
    const [destLanguages, setDestLanguages] = React.useState(getActiveLanguagesAsArray());

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
                    <Button variant="outlined">{translate("Translate")}</Button>
                </div>
            </Box>
            <Box>
                <div>
                    <TextField
                        id="result-en-input"
                        label="English"
                        defaultValue=""
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    />
                    <TextField
                        id="result-ge-input"
                        label="Deutsch"
                        defaultValue=""
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    />
                    <TextField
                        id="result-nn-input"
                        label="Nynorsk"
                        defaultValue=""
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    />
                    <TextField
                        id="result-nb-input"
                        label="Bokmål"
                        defaultValue=""
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    />
                    <TextField
                        id="result-uk-input"
                        label="Українська"
                        defaultValue=""
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    />
                    <TextField
                        id="result-it-input"
                        label="Italiano"
                        defaultValue=""
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    />
                    <TextField
                        id="result-fr-input"
                        label="Francais"
                        defaultValue=""
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    />
                    <TextField
                        id="result-es-input"
                        label="Espanol"
                        defaultValue=""
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    />
                    <TextField
                        id="result-da-input"
                        label="Danish"
                        defaultValue=""
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    />
                    <TextField
                        id="result-sv-input"
                        label="Svenska"
                        defaultValue=""
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    />
                    <TextField
                        id="result-gr-input"
                        label="Greek"
                        defaultValue=""
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    />
                </div>
            </Box>
        </div>
    ); 
};

export default TranslateContent;