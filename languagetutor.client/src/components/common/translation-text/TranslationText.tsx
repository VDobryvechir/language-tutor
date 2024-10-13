import TextField from '@mui/material/TextField';
import React from 'react';
import './TranslationText.css';

interface Props {
    hint?: string;
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

const consumeUntilNextDigitLine = (data: string, pos: number, num: number): number => {
    const n = data.length;
    let i = pos + 1;
    const numStr = "" + num;
    const first = numStr[0];
    for (; i < n; i++) {
        if (data[i] === first && data.substring(i, i + numStr.length) === numStr) {
            break;
        }
    }
    return i - pos;
}

const separateTextToLines = (data: string): string[] => {
    const res: string[] = [];
    const n = data.length;
    let num = 0, pos=0, omit=0, pattern = 0;
    for (let i = 0; i < n; i++) {
        const c = data[i];
        if (c == '\n') {
            if (pattern >= 2) {
                omit = consumeUntilNextDigitLine(data, i, num);
            } else {
                if (pattern === 0) {
                    pattern = -1;
                }
                omit = 1;
            }
        } else if (pattern>=0 && c >= '0' && c <= '9') {
            let cnt = countDigits(data, i, n);
            let dig = data.substring(i, i + cnt);
            let curDig = "" + num;
            if (i + cnt < n && data[i + cnt] >= 'A' && (dig === curDig || num === 0)) {
                omit = cnt;
                pattern++;
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