import React from 'react';
import translate from '../../../i18n/translate.tsx';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import TranslationSource from '../../common/translation-source/TranslationSource.tsx';

const TranslateContent = () => {
    const [origin, setOrigin] = React.useState('');
    const [lines, setLines] = React.useState(['']);

    const handleOriginLanguageChange = (event: SelectChangeEvent) => {
        setOrigin(event.target.value as string);
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
                    
                    <FormGroup>
                        <InputLabel id="origin-language-label">Translate to</InputLabel>
                        <FormControlLabel control={<Switch defaultChecked />} label="English" />
                        <FormControlLabel control={<Switch defaultChecked />} label="Deutsch" />
                        <FormControlLabel control={<Switch defaultChecked />} label="Nynorsk" />
                        <FormControlLabel control={<Switch defaultChecked />} label="Bokmål" />
                        <FormControlLabel control={<Switch defaultChecked />} label="Українська" />
                        <FormControlLabel control={<Switch defaultChecked />} label="Polski" />
                        <FormControlLabel control={<Switch defaultChecked />} label="Italiano" />
                        <FormControlLabel control={<Switch defaultChecked />} label="Espanol" />
                        <FormControlLabel control={<Switch defaultChecked />} label="Francais" />
                        <FormControlLabel control={<Switch defaultChecked />} label="Dansk" />
                        <FormControlLabel control={<Switch defaultChecked />} label="Svensk" />
                        <FormControlLabel control={<Switch defaultChecked />} label="Greek" />
                    </FormGroup>
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