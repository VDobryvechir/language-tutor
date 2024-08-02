import React from 'react';
import { RepetitionProps, RepetitionOptionDefinition } from '../../../providers/RepititionContext';
import GeneralForm from '../../common/general-form/GeneralForm';
import './RepetitionOptions.css';

const RepetitionOptions = ({ repetitionModel, setRepetitionModel }: RepetitionProps) => {
    const setRepetitionOption = (obj:any, key:string,val:any) => {
        const options = {
            ...repetitionModel.options,
            [key]: val,
        };
        setRepetitionModel({
            ...repetitionModel,
            options,
        });
    };
    const getRepetitionOption = (obj: any, key: string): any => {
        return repetitionModel.options[key];
    };
    return (
        <div className="repetition-options">
            <GeneralForm source={repetitionModel} setter={setRepetitionOption} getter={getRepetitionOption} fields={RepetitionOptionDefinition } />
        </div>
    );
};

export default RepetitionOptions;