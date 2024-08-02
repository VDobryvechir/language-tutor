import React, { useState} from 'react';
import { RepetitionProps, clearAudioPositions } from '../../../providers/RepititionContext';
import translate from '../../../i18n/translate';
import {milisecondsToTime, timeToMiliseconds } from '../../../providers/AudioTextUtilities';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './RepetitionAudio.css';

const RepetitionAudio = ({ repetitionModel, setRepetitionModel }: RepetitionProps) => {
    const [step, setStep] = useState(-1);
    

    const setAudioUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        setRepetitionModel({
            ...repetitionModel,
            audioSource: url,
        });
    }; 
    const startPlayer = () => {
        const audio = document.getElementById("audio-calibrator");
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    };
    const endPlayer = () => {
        const audio = document.getElementById("audio-calibrator");
        audio.pause();
    };
    const startCalibration = () => {
        setStep(0);
        repetitionModel.audioPositions = [];
        setAudioPosAmount(0, 0);
        startPlayer();
    };
    const markPosition = () => {
          if (step<0) {
              return;
          }
          const index = step;
          const limit = repetitionModel.sourceLines.length;
          if (index>= limit) {
              endPlayer();
              setStep(-1);
          } else {
            setStep(index+1);
            const audio = document.getElementById("audio-calibrator");
            const amount = Math.round(audio.currentTime * 1000);
            if (index===limit-2) {
                repetitionModel.audioPositions = getAudioPosAmount(Math.round(audio.duration * 1000),limit-1)
            }
            setAudioPosAmount(amount, index);
          }
    };
    const getAudioPosAmount = (amount: number, index:number): number[] => {
        const audioPositions = (repetitionModel.audioPositions || []).slice();
        audioPositions[index] = amount;
        return audioPositions;
    };
    const setAudioPosAmount = (amount: number, index:number): void => {
        setRepetitionModel({
            ...repetitionModel,
            audioPositions: getAudioPosAmount(amount,index),
        });
    };

    const setAudioPos = (time: string, index:number): void => {
        const amount = timeToMiliseconds(time);
        setAudioPosAmount(amount, index);
    };
    return (
        <>
            <div className="repetition-audio__url">
                <span className="repetition-audio__url-label">{translate("Audio")} URL:</span>
                <TextField
                    id="repetition-audio-url"
                    label="URL"
                    variant="standard"
                    value={ repetitionModel.audioSource }
                    className="repetition-audio__url-input"
                    onChange={setAudioUrl }
                />
            </div>
            <div>
                <audio controls src={repetitionModel.audioSource} id="audio-calibrator">
                </audio>
            </div>
            <div className="repetition-audio__position-bar">
                <div className="repetition-audio__position-title">
                    { translate("Audio positions")}
                </div>
                <Button
                    variant="outlined"
                    onClick={() => setRepetitionModel(clearAudioPositions(repetitionModel))}
                >{translate("Clear")}</Button>
                <Button
                    variant="outlined"
                    onClick={startCalibration}
                >{translate("Calibrate")}</Button>
                <Button
                    variant="outlined"
                    onClick={markPosition}
                    disabled={step<0}
                >{translate("Mark position")}</Button>
            </div>
            <div className="repetition-audio__position-grid">
                {repetitionModel.sourceLines.map((line:string,index:number) => (
                    <React.Fragment key={'alt'+index}>
                       <div>
                       <TextField
                            id="repetition-audio-pos{index}"
                            label="Time"
                            variant="standard"
                            value={ milisecondsToTime(repetitionModel.audioPositions[index]) }
                            onChange={(event) => setAudioPos(event.target.value, index) }
                        />
                       </div>
                       <div className="repetition-audio__position-grid-text">
                            {index+1}. {line}
                       </div>
                    </React.Fragment>
                ))}        
            </div>
        </>
    );
};

export default RepetitionAudio;
