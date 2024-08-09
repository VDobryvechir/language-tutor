import React from 'react';
import { useParams } from 'react-router-dom';
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
};
const RepetitionContent = ({iniModel }: Props) => {
    const [value, setValue] = React.useState('1');
    const [repetitionModel, setRepetitionModel] = React.useState(getInitialRepetitionModel(iniModel));

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="Audio repetition">
                        <Tab label={ translate("Text sources")} value="1" />
                        <Tab label={translate("Audio")} value="2" />
                        <Tab label={ translate("Options") } value="3" />
                        <Tab label={ translate("Play") } value="4" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <RepetitionTexts repetitionModel={repetitionModel} setRepetitionModel={ setRepetitionModel} />
                </TabPanel>
                <TabPanel value="2">
                    <RepetitionAudio repetitionModel={repetitionModel} setRepetitionModel={setRepetitionModel} />
                </TabPanel>
                <TabPanel value="3">
                    <RepetitionOptions repetitionModel={repetitionModel} setRepetitionModel={setRepetitionModel} />
                </TabPanel>
                <TabPanel value="4">
                    <RepetitionPlay repetitionModel={repetitionModel} setRepetitionModel={setRepetitionModel} />
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default RepetitionContent;