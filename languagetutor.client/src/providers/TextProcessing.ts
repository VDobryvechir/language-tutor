import { RepetitionModel } from "../models/RepetitionModel";
import { showError, showInfo } from './Notifier';

const findPreEntrance = (s: string, pos: number[]): string => {
    const startPos = pos[0];
    if (startPos < 0) {
        return "";
    }
    return s.substring(0, startPos).trim();
};

const findPostEntrance = (s: string, pos: number[]): string => {
    const endPos = pos[1];
    if (endPos < 0) {
        return "";
    }
    return s.substring(endPos).trim();
};

const integrateTimeByStep = (res: number, m: number, step: number): number => {
    if (step >= 0) {
        res += m * 1000;
    } else {
        switch (step) {
            case -2:
                res += m * 100;
                break;
            case -3:
                res += m * 10;
                break;
            case -4:
                res += m;
                break;
        }
    }
    return res;
};

const analyzeValidTimeString = (s: string): number => {
    const n = s.length;
    let res = 0;
    let m = 0;
    let step = 1;
    for (let i = 0; i < n; i++) {
        const c = s[i];
        if (c >= '0' && c <= '9') {
            const cd = c.charCodeAt(0) - 48;
            if (step >= -3) {
                m = m * 10 + cd;
                if (step < 0) {
                    step--;
                }
            }
        } else if (c === ':') {
            if (step !== 1) {
                return -1;
            }
            res = m * 60000;
            m = 0;
            step = 0;
        } else if (c === '.') {
            if (step < 0) {
                return -1;
            }
            res = integrateTimeByStep(res, m, step);
            m = 0;
            step = -1;
        } else if (c !== ' ') {
            return -1;
        }
    }
    if (m > 0) {
        res = integrateTimeByStep(res, m, step);
    }
    return res;
};

const findTimeEntrance = (s: string, pos: number[]): void => {
    pos[0] = -1;
    let p = 0;
    const n = s.length;
    while (p < n) {
        pos[0] = s.indexOf('(', p);
        if (pos[0] < 0) {
            break;
        }
        pos[1] = s.indexOf(')', pos[0]);
        if (pos[1] < 0) {
            pos[0] = -1;
            break;
        }
        pos[1]++;
        let audioPos = analyzeValidTimeString(s.substring(pos[0] + 1, pos[1] - 1))
        if (audioPos >= 0) {
            pos[2] = audioPos;
            return;
        }
        p = pos[0] + 1;
        pos[0] = -1;
    }
};

export const textProcessByTimeRemoving = (lines: string[], timeTable?:number[] | null): string[] => {
    const res: string[] = [];
    const pos: number[] = [-1, -1, 0];
    for (let i = 0; i < lines.length; i++) {
        let s = lines[i];
        findTimeEntrance(s, pos);
        while (pos[0] >= 0) {
            const pre = findPreEntrance(s, pos);
            s = findPostEntrance(s, pos);
            if (pre) {
                if (timeTable) {
                    timeTable.push(pos[2]);
                }
                res.push(pre);
            }
            findTimeEntrance(s, pos);
        }
        if (s) {
            if (timeTable) {
                timeTable.push(pos[2]);
            }
            res.push(s);
        }
    }
    return res;
};

const cleanTargetLinesByTimeRemoving = (linesArray: string[][]): string[][] => {
    const res: string[][] = [];
    for (let lines of linesArray) {
        res.push(textProcessByTimeRemoving(lines));
    }
    return res;
};

export const cleanRepetitionModelByTimeRemoving = (model: RepetitionModel): RepetitionModel => {
    const timeTable: number[] | null = model.audioPositions?.length ? null : [];
    return {
        ...model,
        sourceLines: textProcessByTimeRemoving(model.sourceLines || [], timeTable),
        targetLines: cleanTargetLinesByTimeRemoving(model.targetLines || []),
        audioPositions: timeTable ? timeTable : model.audioPositions,
    };
};

export const copyFirstPortion = (data: string[], startIndex: number, maxChars: number): void => {
    let rest = maxChars;
    let count = 0;
    const n = data.length;
    let res = '';
    for (let i = startIndex; rest >= 0 && i < n; i++) {
        let item = data[i] + "\n";
        rest -= item.length;
        if (rest >= 0) {
            res += item;
            count++;
        }
    }
    if (!count) {
        if (startIndex >= n) {
            showError("The end has been reached")
        } else {
            showError("Too big line at " + startIndex);
        }
        return;
    }
    copyToClipboard(res);
    showInfo("Copied " + count + " lines");
};

export const copyToClipboard = (text: string): void => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function () {
            console.log('Text copied to clipboard');
        }).catch(function (err) {
            console.error('Could not copy text: ', err);
        });
    } else {
        // Fallback for browsers that don't support the Clipboard API
        let textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            console.log('Text copied to clipboard');
        } catch (err) {
            console.error('Could not copy text: ', err);
        }
        document.body.removeChild(textArea);
    }
};

export const pasteTextFromClipboard = (callback: (t: string) => void) => {
    // Check if the Clipboard API is available
    if (navigator.clipboard) {
        navigator.clipboard.readText().then(function (text) {
            console.log('Text from clipboard:', text);
            callback(text);
        }).catch(function (err) {
            console.error('Failed to read clipboard contents: ', err);
        });
    } else {
        console.error('Clipboard API not supported');
    }
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

export const separateTextToLines = (data: string): string[] => {
    const res: string[] = [];
    const n = data.length;
    let num = 0, pos = 0, omit = 0, pattern = 0;
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
        } else if (pattern >= 0 && c >= '0' && c <= '9') {
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

