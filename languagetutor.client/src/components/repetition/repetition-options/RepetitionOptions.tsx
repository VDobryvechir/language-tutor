import { RepetitionProps, RepetitionOptionDefinition } from '../../../providers/RepititionContext';
import GeneralForm from '../../common/general-form/GeneralForm';
import './RepetitionOptions.css';

const RepetitionOptions = ({ repetitionModel, setRepetitionModel }: RepetitionProps) => {
    const setRepetitionOption = (obj: any, key: string, val: any) => {
        if (!obj) {
            return;
        }
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
        if (!obj) {
            return "";
        }
        return (repetitionModel.options as any)[key];
    };
    return (
        <div className="repetition-options">
            <GeneralForm source={repetitionModel} setter={setRepetitionOption} getter={getRepetitionOption} fields={RepetitionOptionDefinition } />
        </div>
    );
};

export default RepetitionOptions;