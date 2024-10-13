import { useState, useEffect } from 'react';
import { RepetitionProps, getTranslationLink, getDictionaryLinks } from '../../../providers/RepititionContext';
import translate from '../../../i18n/translate';
import Button from '@mui/material/Button';
import WordPresenter from '../../common/word-presenter/WordPresenter';
import AudioRange from '../audio-range/AudioRange';
import './RepetitionPlay.css';
import DebouncedSlider from '../../common/debounced-slider/DebouncedSlider';
import { PerWordInfo } from '../../../models/RepetitionModel';
import InlineTranslation from '../inline-translation/InlineTranslation';

const pageKey = "repetitionPlay_";
const storageDictionaryKey = pageKey + "dictionary";
const storageShowTranslationKey = pageKey + "showTranslation";
const storageShowWordTranslationKey = pageKey + "showWordTranslation";
const storageShowSourceKey = pageKey + "showSource";
enum PlayAction {
    PlayIdle,
    StartPlayingStage,
    StartPlayingVerse,
    CheckPlayingStageStop,
    GoToNextStage,
    GoToNextVerse,
} 


const saveBooleanLocal = (key: string, val: boolean) => {
    localStorage.setItem(key, "" + val);
};
const retrieveBooleanLocal = (key: string, val: boolean) => {
    const res = localStorage.getItem(key);
    return res ? res==="true" : (val || false);
};

const RepetitionPlay = ({ repetitionModel, fireAction, initVerse, setRepetitionModel }: RepetitionProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [verse, setVerse] = useState(initVerse ? initVerse : 1);
    const [stage, setStage] = useState(0);
    const [timeoutHandles, setTimeoutHandles] = useState([0, 0, 0]);
    const [showSource, setShowSource] = useState(retrieveBooleanLocal(storageShowSourceKey,false));
    const [showTranslation, setShowTranslation] = useState(retrieveBooleanLocal(storageShowTranslationKey, false));
    const [showWordTranslation, setShowWordTranslation] = useState(retrieveBooleanLocal(storageShowWordTranslationKey, true));
    const [loop, setLoop] = useState(false);
    const [dictionary, setDictionary] = useState(retrieveBooleanLocal(storageDictionaryKey, false));
    const [playAction, setPlayAction] = useState(PlayAction.PlayIdle);

    useEffect(
        () => {
            if (playAction === PlayAction.PlayIdle) {
                return;
            }
            const action = playAction;
            setPlayAction(PlayAction.PlayIdle);
            switch (action) {
                case PlayAction.StartPlayingStage:
                    startPlayingStage();
                    break;
                case PlayAction.StartPlayingVerse:
                    startPlayingVerse();
                    break;
                case PlayAction.CheckPlayingStageStop:
                    checkPlayingStageStop();
                    break;
                case PlayAction.GoToNextStage:
                    goToNextStage();
                    break;
                case PlayAction.GoToNextVerse:
                    goToNextVerse();
                    break;
            }
        },
        [playAction]
    );

    const markTimeoutHandle = (handleId: number, storeNumber: number) => {
        const newHandles = timeoutHandles.slice();
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
        const audio = document.getElementById("audio-repetitor") as HTMLAudioElement;
        audio.pause();
    };
    const startingShowSource = () => {
        setShowSource(true);
    };
    const startingShowTranslation = () => {
        setShowTranslation(true);
    }
    const checkStartingText = (stageCurrent: number, stageNo: number, delaySeconds: number, fn: Function, timeoutNumber: number): void => {
        if (stageNo !== stageCurrent) {
            return;
        }
        const delay = Math.round(delaySeconds * 1000);
        if (delay > 0) {
            markTimeoutHandle(setTimeout(fn, delay), timeoutNumber);
        } else {
            fn();
        }
    };

    const checkStartingSources = (stageCurrent: number): void => {
        checkStartingText(stageCurrent, repetitionModel.options.showSourceAt, repetitionModel.options.delaySource, startingShowSource, 1);
        checkStartingText(stageCurrent, repetitionModel.options.showTranslationAt, repetitionModel.options.delayTranslation, startingShowTranslation, 2);
    }
    const goToNextVerse = (): void => {
        if (loop) {
            setPlayAction(PlayAction.StartPlayingVerse);
            return;
        }
        const numberOfVerses = repetitionModel.sourceLines?.length || 0;
        if (verse < numberOfVerses) {
            setShowSource(false);
            setShowTranslation(false);
            setVerse(verse + 1);
            setPlayAction(PlayAction.StartPlayingVerse);
        } else {
            fireAction && fireAction("next-chapter");
        }
    }
    const goToNextStage = (): void => {
        const stageAmount = repetitionModel.options.repetitionNumber || 0;
        const nextStage = stage + 1;
        if (nextStage >= stageAmount) {
            setPlayAction(PlayAction.GoToNextVerse);
        } else {
            setStage(nextStage);
            checkStartingSources(nextStage);
            setPlayAction(PlayAction.StartPlayingStage);
        }
    };
    const checkPlayingStageStop = (): void => {
        const audio = document.getElementById("audio-repetitor") as HTMLAudioElement;
        const expectedWaiting = Math.round(repetitionModel.audioPositions[verse - 1] - audio.currentTime * 1000);
        if (expectedWaiting < 2) {
            audio.pause();
            const delayAfter = Math.round(repetitionModel.options.delayAfter * 1000);
            if (delayAfter > 0) {
                markTimeoutHandle(window.setTimeout(() => setPlayAction(PlayAction.GoToNextStage), delayAfter) as number, 0);
            } else {
                setPlayAction(PlayAction.GoToNextStage);
            }
        } else {
            markTimeoutHandle(window.setTimeout(() => setPlayAction(PlayAction.CheckPlayingStageStop), expectedWaiting) as number, 0);
        }
    };
    const startPlayingStage = (): void => {
        const audio = document.getElementById("audio-repetitor") as HTMLAudioElement;
        const currentTime = verse <= 1 ? 0 : repetitionModel.audioPositions[verse - 2];
        audio.currentTime = currentTime * 0.001;
        audio.play();
        setPlayAction(PlayAction.CheckPlayingStageStop);
    };
    const cleanPlayingVerse = (): void => {
        stopAudio();
        resetTimeoutHandles();
        setStage(0);
    };
    const startPlayingVerse = (): void => {
        cleanPlayingVerse();
        checkStartingSources(0);
        const delayBefore = Math.round(repetitionModel.options.delayBefore * 1000);
        if (delayBefore > 0) {
            markTimeoutHandle(window.setTimeout(() => setPlayAction(PlayAction.StartPlayingStage), delayBefore) as number, 0);
        } else {
            setPlayAction(PlayAction.StartPlayingStage);
        }
    };
    const startStopPlaying = (): void => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            setPlayAction(PlayAction.StartPlayingVerse);
        } else {
            cleanPlayingVerse();
            setPlayAction(PlayAction.PlayIdle);
        }
    }; 
    const nextVerse = (): void => {
        performSetVerse(verse + 1);
    }; 
    const previousVerse = (): void => {
        performSetVerse(verse - 1);
    }; 
    const showHideSource = (): void => {
        saveBooleanLocal(storageShowSourceKey, !showSource);
        setShowSource(!showSource);
    }; 
    const showHideTranslation = (): void => {
        saveBooleanLocal(storageShowTranslationKey, !showTranslation);
        setShowTranslation(!showTranslation);
    }; 
    const showHideWordTranslation = (): void => {
        saveBooleanLocal(storageShowWordTranslationKey, !showWordTranslation);
        setShowWordTranslation(!showWordTranslation);
    }; 
    const loopVerse = (): void => {
        setLoop(!loop);
    }; 
    const showLinksToDictionary = (): void => {
        saveBooleanLocal(storageDictionaryKey, !dictionary);
        setDictionary(!dictionary);
    };
    const presentLinkedContent = (lang: string, data: string): JSX.Element => {
        const transLink = getTranslationLink("", lang, repetitionModel.options.primaryLanguage,
            repetitionModel.options.secondaryLanguage, data);
        const dictLink = dictionary && !showWordTranslation ? getDictionaryLinks(lang, data) : "";
        const monoShow = showWordTranslation && lang === repetitionModel.sourceLanguage;
        return (
            <div>
                {monoShow ? <InlineTranslation text={repetitionModel.sourceLines[verse - 1] || ""} lang={lang} srcLang={repetitionModel.sourceLanguage} dstLang={repetitionModel.targetLanguages} langFilter={repetitionModel.activeLanguages} mode={1} />
                   : <div dangerouslySetInnerHTML={{ __html: transLink }} ></div>
                }
                {showWordTranslation ? <InlineTranslation text={repetitionModel.sourceLines[verse - 1] || ""} lang={lang} srcLang={repetitionModel.sourceLanguage} dstLang={repetitionModel.targetLanguages} langFilter={repetitionModel.activeLanguages} />   
                    : <div dangerouslySetInnerHTML={{ __html: dictLink }} className="repetition-play__dict-link"></div>
                }
            </div>
        );
    };
    const presentContent = (lang: string, dataList: string[], shortList?: PerWordInfo[], longList?: PerWordInfo[]): JSX.Element => {
        const data = verse <= dataList.length ? dataList[verse - 1] : "";
        const transLink = getTranslationLink("", lang, repetitionModel.options.primaryLanguage,
            repetitionModel.options.secondaryLanguage, data, "href");
        const shortVerse = shortList ? shortList[verse - 1] : null;
        const longVerse = longList ? longList[verse - 1] : null;

        return (
            <div key={lang} >
                <div>
                    <span className="repetition-play__present-lang">
                        <a target={"trans" + lang} href={transLink}>
                            {translate(lang)}
                        </a>
                    </span>
                    <span>
                        {presentLinkedContent(lang, data)}
                    </span>
                </div>
                {showWordTranslation && shortVerse ? <WordPresenter language={lang} shortList={shortVerse} longList={longVerse} /> : null}
            </div>
        )
    };
    const performSetVerse = (value: number) => {
        const numberOfVerses = repetitionModel.sourceLines?.length || 0;
        if (value && value !== verse && value > 0 && value <= numberOfVerses) {
            setVerse(value);
            if (isPlaying) {
                setShowSource(false);
                setShowTranslation(false);
                setPlayAction(PlayAction.StartPlayingVerse);
            }
        }
    };

    const verseSliderHandleChange = (value: number): void => {
        performSetVerse(value);
    };
    const handleAudioPositions = (value: number[]): void => {
        const model = {
            ...repetitionModel,
            audioPositions: value,
        };
        setRepetitionModel(model);
    };
    return (
        <div>
            <div className="repetition-play__audio-verse"><audio controls src={repetitionModel.audioSource} id="audio-repetitor"></audio>
                <span>
                    <div className="repetition-play__verse-slider">
                        <span>{translate("Verse")} {verse} / {repetitionModel.sourceLines?.length || 0} </span>
                        <span className="repetition-play__slider">
                            {repetitionModel.sourceLines?.length && verse ? <DebouncedSlider
                                size="small"
                                value={verse}
                                ariaLabel="Small"
                                valueLabelDisplay="auto"
                                min={1}
                                max={repetitionModel.sourceLines.length}
                                step={1}
                                onChange={verseSliderHandleChange}
                                delay={400}
                            /> : null
                            }
                        </span>
                    </div>
                    <div>
                        <AudioRange audioPositions={repetitionModel.audioPositions} verse={verse} onChange={handleAudioPositions} />
                    </div>
                </span>
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
                    onClick={showHideWordTranslation}
                >{translate(showWordTranslation ? "Hide word translation" : "Show word translation")}</Button>
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
                {showSource ? presentContent(repetitionModel.sourceLanguage, repetitionModel.sourceLines, repetitionModel.shortSource, repetitionModel.longSource) :
                    <div className="repetition-play__noinfo">{translate("Source is hidden")}</div>} 
            </div>
            <div>
                {showTranslation && repetitionModel.targetLanguages && repetitionModel.targetLanguages.map((lang, index) => repetitionModel.activeLanguages[lang] ? presentContent(lang, repetitionModel.targetLines[index], repetitionModel.shortLines && repetitionModel.shortLines[index], repetitionModel.longLines && repetitionModel.longLines[index]) : null) ||
                    <div className="repetition-play__noinfo">{translate("Translation is hidden")}</div>}
            </div>
        </div>
    );
};

export default RepetitionPlay;
