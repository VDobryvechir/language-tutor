import TextField from '@mui/material/TextField';
import React from 'react';
import './TranslationText.css';

interface Props {
    hint: string;
    lines: string[];
    setLines: (lines: string[]) => void;
};

const countDigits = (s: string, pos: number, n: number): number => {
    let res = 0;
    for (; pos < n && s[pos] >= '0' && s[pos] <= '9'; pos++) {
        res++;
    }
    return res;
}; 

const separateTextToLines = (data: string): string[] => {
    const res: string[] = [];
    const n = data.length;
    let num = 0, pos=0, omit=0;
    for (let i = 0; i < n; i++) {
        const c = data[i];
        if (c == '\n') {
            omit = 1;
        } else if (c >= '0' && c <= '9') {
            let cnt = countDigits(data, i, n);
            let dig = data.substring(i, i + cnt);
            let curDig = "" + num;
            if (i + cnt < n && data[i + cnt] >= 'A' && (dig === curDig || num === 0)) {
                omit = cnt;
                if (num === 0) {
                    num = +dig + 1;
                } else {
                    num++;
                }
            } else {
                i += cnt - 1;
            }
        }
        if (omit > 0) {
            if (i > pos) {
                res.push(data.substring(pos, i));
            }
            pos = i + omit;
            i = pos - 1;
            omit = 0;
        }
    }
    if (pos < n) {
        res.push(data.substring(pos));
    }
    console.log(data, res);
    return res;
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
                placeholder={hint}
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