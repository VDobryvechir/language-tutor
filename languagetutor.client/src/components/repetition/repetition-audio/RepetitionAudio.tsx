import React, { useState, useReducer, useEffect } from 'react';
import { RepetitionProps, clearAudioPositions, extractSaveablePayload, RepetitionModel } from '../../../providers/RepititionContext';
import translate from '../../../i18n/translate';
import {milisecondsToTime, timeToMiliseconds } from '../../../providers/AudioTextUtilities';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './RepetitionAudio.css';
import SaveOpenDialog from '../../common/save-open-dialog/SaveOpenDialog';
import { loadDbItem, saveDbItem } from '../../../providers/IndexedStorage';
import { clearInterval } from 'timers';
import { showError } from '../../../providers/Notifier';

const repetitionAudioDbParams = "repetition.chapter.name";
interface PositionTime {
    index?: number;
    value: string;
    payload?: RepetitionModel;
};

const repetitionPositionInit = (repetitionModel: RepetitionModel): string[] => {
    const res: string[] = [];
    const n = repetitionModel.audioPositions.length;
    for (let i = 0; i < n; i++) {
        res[i] = milisecondsToTime(repetitionModel.audioPositions[i]);
    }
    return res;
}; 

const reducePositionTime = (state: string[], action: PositionTime): string[] => {
    if (typeof action.index === "number") {
        const newState = state.slice();
        newState[action.index] = action.value;
        return newState;
    } else if (action.payload) {
        return repetitionPositionInit(action.payload);
    }
    return state;
};

const RepetitionAudio = ({ repetitionModel, setRepetitionModel, saveAudioPositions, startTab }: RepetitionProps) => {
    const [step, setStep] = useState(-1);
    const [openLoad, setOpenLoad] = useState(false);
    const [openSave, setOpenSave] = useState(false);
    const [finishTime, setFinishTime] = useState(-1);
    const [timerCounter, setTimerCounter] = useState(0);
    const [positionTime, dispatchPositionTime] = useReducer(reducePositionTime, repetitionModel, repetitionPositionInit);

    useEffect(
        () => {
            const audio = document.getElementById("audio-calibrator") as HTMLAudioElement;
            if (finishTime < 0) {
                return;
            }
            let dif = (finishTime - audio.currentTime) * 1000;
            console.log(dif, finishTime, audio.currentTime);
            if (dif < 2) {
                audio.pause();
                setFinishTime(-1);
                return;
            };
            dif = Math.round(dif);
            const timerId = setTimeout(() => setTimerCounter(timerCounter + 1), dif);
            return () => timerId && window.clearTimeout(timerId);
        },
        [finishTime, timerCounter]
    );

    const audioVerse = (index: number): void => {
        if (step < 0 && repetitionModel.audioPositions[index]) {
            const start = index == 0 ? 0 : repetitionModel.audioPositions[index - 1];
            const end = repetitionModel.audioPositions[index];
            if (start < end) {
                const audio = document.getElementById("audio-calibrator") as HTMLAudioElement;
                audio.pause();
                audio.currentTime = start * 0.001;
                audio.play();
                const finTime = end * 0.001; 
                setFinishTime(finTime);
                setTimerCounter(timerCounter + 1);
            }
        }
    };
    const setAudioUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        setRepetitionModel({
            ...repetitionModel,
            audioSource: url,
        });
    }; 
    const startPlayer = () => {
        const audio = document.getElementById("audio-calibrator") as HTMLAudioElement;
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    };
    const endPlayer = () => {
        const audio = document.getElementById("audio-calibrator") as HTMLAudioElement;
        audio.pause();
    };
    const startCalibration = () => {
        setStep(0);
        repetitionModel.audioPositions = [];
        setAudioPosAmount(0, 0);
        startPlayer();
    };
    const setAudioScrollPosition = (index: number) => {
        const elem = document.getElementById(`repetition-audio-${index}`);
        if (!elem) {
            return;
        }
        elem.scrollIntoView({
            behavior: "smooth",
        });
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
              const audio = document.getElementById("audio-calibrator") as HTMLAudioElement;
              if (!audio) {
                  showError("Audio is not present");
                  return;
              }
              const amount = Math.round(audio.currentTime * 1000);
              if (index === limit - 2) {
                  const positions = getAudioPosAmount(Math.round(audio.duration * 1000), limit - 1);
                  if (positions) {
                      repetitionModel.audioPositions = positions;
                  }
              }
              setAudioPosAmount(amount, index);
              setAudioScrollPosition(index + 1);
              dispatchPositionTime({ index: index, value: milisecondsToTime(amount)});
          }
    };
    const getAudioPosAmount = (amount: number, index: number): number[] | null => {
        if (repetitionModel.audioPositions && repetitionModel.audioPositions[index] === amount) {
            return null;
        }
        const audioPositions = (repetitionModel.audioPositions || []).slice();
        audioPositions[index] = amount;
        return audioPositions;
    };
    const isFullyValidPosition = (positions: number[]): boolean => {
        const n = positions?.length || 0;
        if (!n || n !== repetitionModel.sourceLines.length || !positions[n-1]) {
            return false;
        }
        for (let i = 1; i < n; i++) {
            if (positions[i] < positions[i - 1]) {
                return false;
            }
        }
        return true;
    };
    const setAudioPosAmount = (amount: number, index: number): void => {
        const positions: number[] = getAudioPosAmount(amount, index);
        if (!positions) {
            return;
        }
        setRepetitionModel({
            ...repetitionModel,
            audioPositions: positions,
        });
        if (isFullyValidPosition(positions) && startTab === 1 && saveAudioPositions) {
            saveAudioPositions(positions); 
        }
    };
    const handleLoadClose = (name:string) => {
        setOpenLoad(false);
        if (name) {
            loadDbItem({
                dbparams: repetitionAudioDbParams,
                filter: name,
                response: (res) => {
                    if (res.error) {
                        console.log(res.error);
                    } else {
                        const model = extractSaveablePayload(res.payload, repetitionModel);
                        setRepetitionModel(model);
                        dispatchPositionTime({ payload: model });
                    }
                }
            })
        }
    };
    const handleSaveClose = (name:string) => {
        setOpenSave(false);
        if (name) {
            saveDbItem({
                dbparams: repetitionAudioDbParams,
                filter: name,
                payload: repetitionModel,
                response: (res) => {
                    if (res.error) {
                        console.log(res.error);
                    } else {
                        console.log(res.payload);
                    }
                }
            })
        }
    };
    const setAudioPos = (value: string, index:number): void => {
        const amount = timeToMiliseconds(value);
        setAudioPosAmount(amount, index);
        dispatchPositionTime({index, value});
    };
    const clearProcedure = () => {
        if (startTab === 1) {
            showError("Here function is not defined");
            return;
        }
        setRepetitionModel(clearAudioPositions(repetitionModel));
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
            <div className="repetition-audio__audio-player">
                <audio controls src={repetitionModel.audioSource} id="audio-calibrator">
                </audio>
                {startTab === 0 ?
                    <Button
                    variant="outlined"
                    onClick={() => setOpenSave(true)}
                >{translate("Save")}</Button>
                    : null
                }
                {startTab === 0 ?
                <Button
                        variant="outlined"
                        onClick={() => setOpenLoad(true)}
                    >{translate("Load")}</Button>
                    : null 
                }
            </div>
            <div className="repetition-audio__position-bar">
                <div className="repetition-audio__position-title">
                    { translate("Audio positions")}
                </div>
                {startTab === 0 ? <Button
                    variant="outlined"
                    onClick={clearProcedure}
                >{translate("Clear")}</Button>
                    : null
                }
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
                {repetitionModel.sourceLines.map((line: string, index: number) => (
                    <React.Fragment key={'alt' + index}>
                        <div id={"repetition-audio-"+index} style={{ backgroundColor: step === index ? 'yellow' : 'inherit' }}>
                       <TextField
                                variant="standard"
                                value={positionTime[index] || ''}
                                onChange={(event) => setAudioPos(event.target.value, index) }
                        />
                       </div>
                        <div className="repetition-audio__position-grid-text" onClick={() => audioVerse(index) } style={{ backgroundColor: step === index ? 'white' : 'inherit' }}>
                            {index+1}. {line}
                       </div>
                    </React.Fragment>
                ))}        
            </div>
            <SaveOpenDialog
                operation="Load"
                open={openLoad}
                onClose={handleLoadClose}
                dbparams={repetitionAudioDbParams}
            />
            <SaveOpenDialog
                operation="Save"
                open={openSave}
                onClose={handleSaveClose}
                dbparams={repetitionAudioDbParams }
            />

        </>
    );
};

export default RepetitionAudio;
