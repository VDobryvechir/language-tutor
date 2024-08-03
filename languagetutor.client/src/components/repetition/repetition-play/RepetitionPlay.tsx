import { useState } from 'react';
import { RepetitionProps, getTranslationLink, getDictionaryLinks } from '../../../providers/RepititionContext';
import translate from '../../../i18n/translate';
import { milisecondsToTime, timeToMiliseconds } from '../../../providers/AudioTextUtilities';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './RepetitionPlay.css';

const pageKey = "repetitionPlay_";
const storageDictionaryKey = pageKey + "dictionary";
const storageShowTranslationKey = pageKey + "showTranslation";
const storageShowSourceKey = pageKey + "showSource";

const saveBooleanLocal = (key: string, val: boolean) => {
    localStorage.setItem(key, "" + val);
};
const retrieveBooleanLocal = (key: string, val: boolean) => {
    const res = localStorage.getItem(key);
    return res ? res==="true" : (val || false);
};

const RepetitionPlay = ({ repetitionModel, setRepetitionModel, fireAction }: RepetitionProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [verse, setVerse] = useState(1);
    const [stage, setStage] = useState(0);
    const [timeoutHandles, setTimeoutHandles] = useState([0, 0, 0]);
    const [showSource, setShowSource] = useState(retrieveBooleanLocal(storageShowSourceKey,false));
    const [showTranslation, setShowTranslation] = useState(retrieveBooleanLocal(storageShowTranslationKey, false));
    const [loop, setLoop] = useState(false);
    const [dictionary, setDictionary] = useState(retrieveBooleanLocal(storageDictionaryKey, false));

    const markTimeoutHandle = (handleId: number, storeNumber) => {
        newHandles = timeoutHandles.slice();
        newHandles[storeNumber || 0] = handleId;
        setTimeoutHandles(newHandles);
    };
    const resetTimeoutHandles = () => {
        const n = timeoutHandles.length || 0;
        for (let i = 0; i < n; i++) {
            clearTimeout(timeoutHandles[i]);
        }
        setTimeoutHandles([0, 0, 0]);
    };
    const stopAudio = () => {
        const audio = document.getElementById("audio-repetitor");
        audio.pause();
    };
    const startingShowSource = () => {
        setShowSource(true);
    };
    const startingShowTranslation = () => {
        setShowTranslation(true);
    }
    const checkStartingText = (stageNo: number, delaySeconds: number, fn: Function, timeoutNumber: number): void => {
        if (stageNo !== stage) {
            return;
        }
        const delay = Math.round(delaySeconds * 1000);
        if (delay > 0) {

        } else {
            markTimeoutHandle(setTimeout(fn, delay), timeoutNumber);
        }
    };

    const checkStartingSources = () => {
        checkStartingText(repetitionModel.options.showSourceAt, repetitionModel.options.delaySource, startingShowSource, 1);
        checkStartingText(repetitionModel.options.showTranslationAt, repetitionModel.options.delayTranslation, startingShowTranslation, 2);
    }
    const goToNextVerse = () => {
        if (loop) {
            startPlayingVerse();
            return;
        }
        const numberOfVerses = repetitionModel.sourceLines.length;
        if (verse < sourceLines.length) {
            setShowSource(false);
            setShowTranslation(false);
            setVerse(verse + 1);
            startPlayingVerse();
        } else {
            fireAction && fireAction("next-chapter");
        }
    }
    const goToNextStage = () => {
        const stageAmount = repetitionModel.options.repetitionNumber || 0;
        const nextStage = stage + 1;
        if (nextStage >= stageAmount) {
            goToNextVerse();
        } else {
            setStage(nextStage);
            checkStartingSources();
            startPlayingStage();
        }
    };
    const checkPlayingStageStop = () => {
        const audio = document.getElementById("audio-repetitor");
        const expectedWaiting = Math.round(repetitionModel.audioPositions[verse - 1] - audio.currentTime * 1000);
        if (expectedWaiting < 10) {
            audio.pause();
            const delayAfter = Math.round(repetitionModel.options.delayAfter * 1000);
            if (delayAfter > 0) {
                markTimeoutHandle(setTimeout(goToNextStage, delayAfter));
            } else {
                goToNextStage();
            }
        } else {
            markTimeoutHandle(setTimeout(checkPlayingStageStop, expectedWaiting));
        }
    }
    const startPlayingStage = () => {
        const audio = document.getElementById("audio-repetitor");
        const currentTime = verse <= 1 ? 0 : repetitionModel.audioPositions[verse - 2];
        audio.currentTime = currentTime * 0.001;
        audio.play();
        checkPlayingStageStop();
    }
    const startPlayingVerse = () => {
        stopAudio();
        resetTimeoutHandles();
        setStage(0);
        checkStartingSources();
        const delayBefore = Math.round(repetitionModel.options.delayBefore * 1000);
        if (delayBefore > 0) {
            startPlayingStage();
        } else {
            markTimeoutHandle(setTimeout(startPlayingStage, delayBefore));
        }
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
        saveBooleanLocal(storageShowSourceKey, !showSource);
        setShowSource(!showSource);
    }; 
    const showHideTranslation = () => {
        saveBooleanLocal(storageShowTranslationKey, !showTranslation);
        setShowTranslation(!showTranslation);
    }; 
    const loopVerse = () => {
        setLoop(!loop);
    }; 
    const showLinksToDictionary = () => {
        saveBooleanLocal(storageDictionaryKey, !dictionary);
        setDictionary(!dictionary);
    };
    const presentLinkedContent = (lang: string, data: string) => {
        const transLink = getTranslationLink("", lang, repetitionModel.options.primaryLanguage,
            repetitionModel.options.secondaryLanguage, data);
        const dictLink = dictionary ? getDictionaryLinks(lang, data) : "";

        return (
            <div>
                <div dangerouslySetInnerHTML={{ __html: transLink }} >
                </div>
                <div dangerouslySetInnerHTML={{ __html: dictLink }} className="repetition-play__dict-link">
                </div>
            </div>
        );
    };
    const presentContent = (lang: string, dataList: string[]) => {
        const data = verse <= dataList.length ? dataList[verse - 1] : ""; 
        const transLink = getTranslationLink("", lang, repetitionModel.options.primaryLanguage,
            repetitionModel.options.secondaryLanguage, data, "href");

        return (
            <div key={ lang } >
                <span className="repetition-play__present-lang">
                    <a target={"trans" + lang} href={transLink}>
                        {translate(lang)}
                    </a>
                </span>
                <span>
                    { presentLinkedContent(lang, data)  }
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
