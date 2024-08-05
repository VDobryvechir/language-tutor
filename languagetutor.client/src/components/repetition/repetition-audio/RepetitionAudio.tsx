import React, { useState} from 'react';
import { RepetitionProps, clearAudioPositions, extractSaveablePayload } from '../../../providers/RepititionContext';
import translate from '../../../i18n/translate';
import {milisecondsToTime, timeToMiliseconds } from '../../../providers/AudioTextUtilities';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './RepetitionAudio.css';
import SaveOpenDialog from '../../common/save-open-dialog/SaveOpenDialog';
import { loadDbItem, saveDbItem } from '../../../providers/IndexedStorage';

const repetitionAudioDbParams = "repetition.chapter.name";

const RepetitionAudio = ({ repetitionModel, setRepetitionModel }: RepetitionProps) => {
    const [step, setStep] = useState(-1);
    const [openLoad, setOpenLoad] = useState(false);
    const [openSave, setOpenSave] = useState(false);

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
                        setRepetitionModel(extractSaveablePayload(res.payload, repetitionModel));
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
            <div className="repetition-audio__audio-player">
                <audio controls src={repetitionModel.audioSource} id="audio-calibrator">
                </audio>
                <Button
                    variant="outlined"
                    onClick={() => setOpenSave(true)}
                >{translate("Save")}</Button>
                <Button
                    variant="outlined"
                    onClick={()=>setOpenLoad(true)}
                >{translate("Load")}</Button>
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
