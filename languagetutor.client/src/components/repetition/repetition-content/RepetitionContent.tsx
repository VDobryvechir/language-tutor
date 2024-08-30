import React from 'react';
import { RepetitionModel } from '../../../models/RepetitionModel.ts';
import translate from '../../../i18n/translate.tsx';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { getInitialRepetitionModel } from '../../../providers/RepititionContext.ts';
import RepetitionTexts from '../repetition-texts/RepetitionTexts.tsx';
import RepetitionAudio from '../repetition-audio/RepetitionAudio.tsx';
import RepetitionOptions from '../repetition-options/RepetitionOptions.tsx';
import RepetitionPlay from '../repetition-play/RepetitionPlay.tsx';
interface Props {
    iniModel: Partial<RepetitionModel>;
    saveAudioPositions?: (pos: number[]) => void;
    startTab: number;
    initVerse: number;
};
const RepetitionContent = ({ iniModel, saveAudioPositions, startTab, initVerse }: Props) => {
    const [value, setValue] = React.useState('' + (initVerse > 0 ? 4 : startTab+1));
    const [repetitionModel, setRepetitionModel] = React.useState(getInitialRepetitionModel(iniModel));

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        if (event) {
            setValue(newValue);
        }
    };

    const fireAction = (name: string) => {
        if (name.startsWith("tab")) {
            const tab = name.substring(3);
            if (tab.length === 1 && tab >= "1" && tab <= "4") {
                setValue(tab);
            }
        }
    };
    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="Audio repetition">
                        {startTab === 0 ? < Tab label={translate("Text sources")} value="1" /> : null }
                        {startTab < 2 ? <Tab label={translate("Audio")} value="2" /> : null}
                        <Tab label={ translate("Options") } value="3" />
                        <Tab label={ translate("Play") } value="4" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <RepetitionTexts repetitionModel={repetitionModel} setRepetitionModel={ setRepetitionModel} />
                </TabPanel>
                <TabPanel value="2">
                    <RepetitionAudio repetitionModel={repetitionModel} setRepetitionModel={setRepetitionModel}
                        saveAudioPositions={saveAudioPositions} startTab={startTab} fireAction={fireAction} />
                </TabPanel>
                <TabPanel value="3">
                    <RepetitionOptions repetitionModel={repetitionModel} setRepetitionModel={setRepetitionModel} />
                </TabPanel>
                <TabPanel value="4">
                    <RepetitionPlay repetitionModel={repetitionModel} setRepetitionModel={setRepetitionModel} initVerse={initVerse} />
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default RepetitionContent;