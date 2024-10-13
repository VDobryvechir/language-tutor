import { useState } from 'react';
import Slider from '@mui/material/Slider';
import "./DebouncedSlider.css";


 
export interface Props {
    size: 'small' | 'medium' | undefined;
    value: number
    ariaLabel: string;
    valueLabelDisplay: 'on' | 'off' | 'auto' | undefined;
    min: number;
    max: number;
    step: number;
    delay?: number;
    onChange: (value: number) => void;
}

const DebouncedSlider = ({size,value,ariaLabel,valueLabelDisplay,onChange,min,max,step,delay}: Props) => {
    const [sliderValue, setSliderValue] = useState([value,value]);
    const [sliderTimer, setSliderTimer] = useState(0);

    const debounce = (func: (p: any) => void, delay: number) => {
        return function (param: any) {
            clearTimeout(sliderTimer);
            const timer = window.setTimeout(() => func(param), delay);
            setSliderTimer(timer);
        };
    };
    if (sliderValue[0] !== value) {
        setSliderValue([value, value]);
    }

    const registerValue = (val: number): void => {
        onChange(val);
    };

    const sliderHandleChange = (event: any) => {
        const debouncedSliderValue = debounce(registerValue, delay || 400);
        const val = event.target.value;
        if (typeof val === 'number' && val >= min) {
            setSliderValue([sliderValue[0], val]);
            debouncedSliderValue(val);
        }
    };

    return (
         <Slider
            size={size}
            value={sliderValue[1]}
            aria-label={ariaLabel}
            valueLabelDisplay={valueLabelDisplay }
            min={min}
            max={max}
            step={step}
            onChange={sliderHandleChange} 
         />
    );
}

export default DebouncedSlider;
