import TextField from '@mui/material/TextField';
import React from 'react';
import { separateTextToLines } from '../../../providers/TextProcessing';
import './TranslationText.css';

interface Props {
    hint?: string;
    lines: string[];
    setLines: (lines: string[]) => void;
};


const TranslationText = ({ hint, setLines, lines}: Props) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const data = separateTextToLines(event.target.value);
        setLines(data);
    };
    const data = lines ? lines.join("\n") : "";
    return (
        <div className="translation-text">
            <TextField
                placeholder={hint || ''}
                multiline
                fullWidth
                onChange={handleChange}
                rows={10}
                value={ data }
            />
        </div>
    );

};

export default TranslationText;