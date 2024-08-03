﻿import React from 'react';
import { GeneralFormField, GeneralGeneratedOptions } from './GeneralFormModel';
import { get } from 'http';
import translate from '../../../i18n/translate';
import './GeneralForm.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import LanguageChooser from '../language-chooser/LanguageChooser';
interface Props {
    source: any;
    setter: (obj: any, key: string, val: any) => void;
    getter: (obj: any, key: string) => any;
    fields: GeneralFormField[];
};
const GeneralForm = ({ source, setter, getter, fields }: Props) => {
    const initValues = {};
    fields.forEach((item: GeneralFormField) => {
        initValues[item.field] = "" + getter(source, item.field); 
    });
    const [tmpValue, setTmpValue] = React.useState(initValues); 
    const setNumberKind = (item: GeneralFormField, val: string) => {
        setTmpValue({
            ...tmpValue,
            [item.field]: val,
        });
        const intVal = item.kind==="int" ? parseInt(val) : parseFloat(val);
        if (!isNaN(intVal) && (item.minValue === undefined || intVal >= item.minValue) && (item.maxValue === undefined || intVal <= item.maxValue)) {
            setter(source, item.field, intVal);
        }
    }
    const getInputByKind = (item: GeneralFormField) => {
        const handleSelectorNumberChange = (event: SelectChangeEvent) => {
            setter(source, item.field, event.target.value as number);
        };
        const getIntValue = (expression: string): number => {
            let n = parseInt(expression);
            if (!isNaN(n)) {
                return n;
            }
            let v = getter(source,expression);
            if (typeof v === "number") {
                return v;
            }
            if (typeof v === "string") {
                n = parseInt(v);
            }
            return n;
        }
        const generateRowOfValues = (option: GeneralGeneratedOptions): string[] | null => {
            const start = getIntValue(option.valueStart);
            const end = getIntValue(option.valueFinish);
            if (isNaN(start) || isNaN(end) || start > end) {
                return null;
            }
            const res: string[] = [];
            for (let i = start; i <= end; i++) {
                res.push("" + i);
            }
            return res;
        }
        const getMenuItem = (vl: string, txt: string) => {
            return (
                <MenuItem value={vl} key={vl}> {txt} </MenuItem>
            );
        };
        const selOptions:JSX.Element[] = [];

        const fillSelOptions = (option: GeneralFieldOption) => {
            selOptions.push(getMenuItem(option.value, translate(option.name)));
        };
        const generateOptions = (option: GeneralGeneratedOptions, selOptions: JSX.Element[]) => {
            const orders = generateRowOfValues(option);
            if (!orders) {
                return;
            }
            const name = option.name;
            orders.forEach((vl: string) => {
                const txt = translate(name, { n: vl });
                selOptions.push(getMenuItem(vl, txt));
            })
        };
        if (item.options) {
            item.options.forEach(fillSelOptions);
        }
        if (item.generatedOptions) {
            item.generatedOptions.forEach((option) => generateOptions(option, selOptions))
        }

        switch (item.kind) {
            case "int":
            case "number":
                return (
                    <TextField
                        label=""
                        variant="standard"
                        value={tmpValue[item.field] }
                        onChange={(event) => setNumberKind(item, event.target.value)}
                    />
                );
            case "selectorNumber":
                return (
                    <FormControl fullWidth >
                        <InputLabel id="general-form-{item.field}-label" > {item.labelTitle && translate(item.labelTitle) || ""} </InputLabel>
                        <Select
                            labelId="general-form-{item.field}-label"
                            id="general-form-{item.field}-select"
                            value={"" + getter(source, item.field)}
                            label={item.selectorLabel && translate(item.selectorLabel) || ""}
                            onChange={handleSelectorNumberChange}
                        >
                            {selOptions}
                        </Select>
                    </FormControl>
                );
            case "string":
                return (
                    <TextField
                        label=""
                        variant="standard"
                        value={getter(source, item.field)}
                        onChange={(event) => setter(source, item.field, event.target.value)}
                    />
                );
            case "language":
                return (
                    <LanguageChooser
                        labelTitle="Language"
                        selectorLabel="Language"
                        language={getter(source, item.field)}
                        setLanguage={(lang) => setter(source, item.field, lang)}
                    />
                );
        }
        return <></>
    };
    return (
        <div className="general-form">
            {fields.map((item,index) => (
                <React.Fragment key={index}>
                    <div className="general-form__field-label">
                        {item.name && translate(item.name) || ""}
                    </div>
                    <div>
                        {getInputByKind(item)}
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
}

export default GeneralForm;