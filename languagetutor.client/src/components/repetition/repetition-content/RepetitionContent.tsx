import React from 'react';
import translate from '../../../i18n/translate.tsx';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const RepetitionContent = () => {
    const [value, setValue] = React.useState('1');

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
                    Tekstkilde
                </TabPanel>
                <TabPanel value="2">Lyd</TabPanel>
                <TabPanel value="3">Optsjon</TabPanel>
                <TabPanel value="4">Spill</TabPanel>
            </TabContext>
        </Box>
    );
};

export default RepetitionContent;