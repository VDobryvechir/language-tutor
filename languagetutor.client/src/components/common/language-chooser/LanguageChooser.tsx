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

interface Props {
    language: string;
    labelTitle: string;
    selectorLabel: string;
    setLanguage: (lang: string) => void;
};

const LanguageChooser = ({ language, labelTitle, selectorLabel, setLanguage }: Props) => {
    const handleLanguageChange = (event: SelectChangeEvent) => {
        setLanguage(event.target.value as string);
    };
    return (
        <FormControl fullWidth >
            <InputLabel id="origin-language-label" > { translate(labelTitle)} </InputLabel>
            <Select
                labelId = "origin-language-label"
                id = "origin-language-select"
                value = { language }
                label={translate(selectorLabel) }
                onChange = { handleLanguageChange }
            >
                <MenuItem value={ "en" }> English </MenuItem>
                <MenuItem value = { "de"} > Deutsch </MenuItem>
                <MenuItem value = { "nn"} > Nynorsk </MenuItem>
                <MenuItem value = { "nb"} > Bokmål </MenuItem>
                <MenuItem value = { "uk"} > Українська </MenuItem>
                <MenuItem value={"it"} > Italiano </MenuItem>
                <MenuItem value={"es"} > Español </MenuItem>
                <MenuItem value={"fr"} > Français </MenuItem>
                <MenuItem value={"gr"} > ελληνικά </MenuItem>
                <MenuItem value={"ru"} > Русский </MenuItem>
                <MenuItem value={"pl"} > Polski </MenuItem>
                <MenuItem value={"da"} > Dansk </MenuItem>
                <MenuItem value={"sv"} > Svenska </MenuItem>
            </Select>
       </FormControl>
    );
};

export default LanguageChooser;
