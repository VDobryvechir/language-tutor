﻿import translate from '../../../i18n/translate.tsx';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
            <InputLabel id="origin-language-label" > {labelTitle && translate(labelTitle)} </InputLabel>
            <Select
                labelId = "origin-language-label"
                id = "origin-language-select"
                value = { language }
                label={selectorLabel && translate(selectorLabel) }
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
                <MenuItem value={"bg"} > Български </MenuItem>
                <MenuItem value={"pt"} > Portuguesa </MenuItem>
                <MenuItem value={"cz"} > český </MenuItem>
            </Select>
       </FormControl>
    );
};

export default LanguageChooser;
