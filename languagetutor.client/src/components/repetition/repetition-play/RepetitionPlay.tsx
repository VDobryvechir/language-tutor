import { useState } from 'react';
import { RepetitionProps } from '../../../providers/RepititionContext';
import translate from '../../../i18n/translate';
import { milisecondsToTime, timeToMiliseconds } from '../../../providers/AudioTextUtilities';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './RepetitionPlay.css';

const RepetitionPlay = ({ repetitionModel, setRepetitionModel }: RepetitionProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [verse, setVerse] = useState(1);
    const [showSource, setShowSource] = useState(false);
    const [showTranslation, setShowTranslation] = useState(false);
    const [loop, setLoop] = useState(false);
    const [dictionary, setDictionary] = useState(false);

    const stopAudio = () => {
        const audio = document.getElementById("audio-repetitor");
        audio.pause();
    }
    const startPlayingVerse = () => {

    };
    const startStopPlaying = () => {
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            startPlayingVerse();
        } else {
            stopAudio();
        }
    }; 
    const nextVerse = () => {
        if (verse < (repetitionModel.sourceLines?.length || 0)) {
            setVerse(verse + 1);
            if (isPlaying) {
                startPlayingVerse();
            }
        }
    }; 
    const previousVerse = () => {
        if (verse > 1) {
            setVerse(verse - 1);
            if (isPlaying) {
                startPlayingVerse();
            }
        }
    }; 
    const showHideSource = () => {
        setShowSource(!showSource);
    }; 
    const showHideTranslation = () => {
        setShowTranslation(!showTranslation);
    }; 
    const loopVerse = () => {
        setLoop(!loop);
    }; 
    const showLinksToDictionary = () => {
        setDictionary(!dictionary);
    };
    const presentContent = (lang: string, data: string[]) => {
        console.log(lang, data, verse);
        return (
            <div key={ lang } >
                <span className="repetition-play__present-lang">
                    {translate(lang) }
                </span>
                <span>
                    { verse<=data.length ? data[verse-1] : "" }
                </span>
            </div>
        )
    }
    return (
        <div>
            <div className="repetition-play__audio-verse"><audio controls src={repetitionModel.audioSource} id="audio-repetitor"></audio>
                <span>{translate("Verse")} {verse} / {repetitionModel.sourceLines && repetitionModel.sourceLines.length || 0} </span>
            </div>
            <div className="repetition-play__buttons">
                <Button
                    variant="outlined"
                    onClick={startStopPlaying}
                >{translate(isPlaying ? "Stop playing": "Start playing")}</Button>
                <Button
                    variant="outlined"
                    onClick={nextVerse}
                >{translate("Next verse")}</Button>
                <Button
                    variant="outlined"
                    onClick={previousVerse}
                >{translate("Previous verse")}</Button>
                <Button
                    variant="outlined"
                    onClick={showHideSource}
                >{translate(showSource ? "Hide source" : "Show source")}</Button>
                <Button
                    variant="outlined"
                    onClick={showHideTranslation}
                >{translate(showTranslation ? "Hide translation" : "Show translation")}</Button>
                <Button
                    variant="outlined"
                    onClick={loopVerse}
                >{translate(loop ? "Break loop" : "Loop verse")}</Button>
                <Button
                    variant="outlined"
                    onClick={showLinksToDictionary}
                >{translate(dictionary ? "Hide dictionary links" : "Show dictionary links")}</Button>
            </div>
            <div>
                {showSource ? presentContent(repetitionModel.sourceLanguage, repetitionModel.sourceLines) :
                    <div className="repetition-play__noinfo">{translate("Source is hidden")}</div>} 
            </div>
            <div>
                {showTranslation && repetitionModel.targetLanguages && repetitionModel.targetLanguages.map((lang, index) => presentContent(lang, repetitionModel.targetLines[index])) ||
                    <div className="repetition-play__noinfo">{translate("Translation is hidden")}</div>}
            </div>
        </div>
    );
};

export default RepetitionPlay;
