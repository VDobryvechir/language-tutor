import "./AudioRange.css";
import { milisecondsToTime } from '../../../providers/AudioTextUtilities';



export interface Props {
    audioPositions: number[];
    verse: number;
    onChange: (values: number[]) => void;
}

const audioRangeStep = 50;

const AudioRange = ({ audioPositions, onChange, verse }: Props) => {
    if (verse <= 0 || verse > (audioPositions?.length || 0)) {
        return (<></>);
    }
    const startValue = milisecondsToTime(verse>1?audioPositions[verse-2]: 0);
    const endValue = milisecondsToTime(audioPositions[verse-1]);

    const checkValue = (val: number, index: number): boolean => {
        if (index === 0) {
            if (val <= 0) {
                return false;
            }
        } else {
            if (val <= audioPositions[index - 1]) {
                return false;
            }
        }
        if (index === audioPositions.length - 1) {
            return false;
        } else if (val >= audioPositions[index + 1]) {
            return false;
        }
        return true;
    };

    const handleChange = (offset:number, delta: number) => {
        const index = verse + offset - 1;
        if (index < 0) {
            return;
        }
        let val = audioPositions[index];
        let moda = val % audioRangeStep;
        if (delta > 0) {
            val += audioRangeStep - moda;
        } else {
            val -= moda ? moda : audioRangeStep;
        }
        if (checkValue(val, index)) {
            const newPos = audioPositions.slice();
            newPos[index] = val;
            onChange(newPos);
        }
    };
    const handleLeftDown = () => handleChange(-1, -1);
    const handleRightDown = () => handleChange(0, -1);
    const handleLeftUp = () => handleChange(-1, 1);
    const handleRightUp = () => handleChange(0, 1);

    return (
        <>
            <span className="audio-range__minus" onClick={handleLeftDown}> - </span>
            <span className="audio-range__plus" onClick={handleLeftUp}> + </span>
            <span> {startValue} </span>
            <span> - </span>
            <span> {endValue}</span>
            <span className="audio-range__minus" onClick={handleRightDown}> - </span>
            <span className="audio-range__plus" onClick={handleRightUp}> + </span>
        </>
    );
}

export default AudioRange;
