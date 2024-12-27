import { RepetitionModel } from "../models/RepetitionModel";

export const milisecondsToTime = (amount: number): string => {
    if (!amount) {
        return "0";
    }
    const milis = amount % 1000;
    amount = (amount - milis) / 1000;
    const seconds = amount % 60;
    amount = (amount - seconds) / 60;
    const minutes = amount % 60;
    const hours = (amount - minutes) / 60;
    return (hours>0? hours+":" : "") + (minutes>9 ? minutes : "0"+minutes) + ":" + 
           (seconds >9? seconds : "0"+seconds)+"."+ (milis>99 ? milis : "0" + (milis>9? milis : "0"+milis ));
} 

const multiplyByFractionOf60 = (factor: number, time: string): number => {
    if (!time) {
        return 0;
    }
    time = time.trim();
    if (!time) {
        return 0;
    }
    const n = parseInt(time);
    return isNaN(n) ? 0 : n * factor; 
 };

export const timeToMiliseconds = (time: string): number => {
    if (!time) {
        return 0;
    }
    let amount = 0;
    const pos = time.lastIndexOf(".");
    if (pos >= 0) {
        let decimal = time.substring(pos + 1).trim();
        time = time.substring(0, pos);
        if (decimal.length > 3) {
            decimal = decimal.substring(0, 3);
        }
        const part = parseInt(decimal);
        switch (decimal.length) {
            case 3:
                amount = part;
                break;
            case 2:
                amount = part * 10;
                break;
            case 1:
                amount = part * 100;
                break;
        }
    }
    const data = time.trim().split(":").reverse();
    amount += multiplyByFractionOf60(1000, data[0]);
    amount += multiplyByFractionOf60(60000, data[1]);
    amount += multiplyByFractionOf60(3600000, data[2]);
    return amount;
}

export const clueLinesByIndex = (index: number, data: string[]): string[] => {
    const ndata = data.slice();
    if (index < ndata.length - 1) {
        ndata[index] = ndata[index].trim() + " " + ndata[index + 1];
        ndata.splice(index + 1, 1);
    }
    return ndata;
};

export const clueNumbersByIndex = (index: number, data: number[]): number[] => {
    const ndata = data.slice();
    if (index < ndata.length - 1) {
        ndata.splice(index + 1, 1);
    }
    return ndata;
};

export const clueLinesInAllSrcAndTargets = (index: number, model: RepetitionModel): RepetitionModel | null => {
    const len = model.sourceLines.length;
    if (index < len - 1) {
        const targetLines = (model.targetLines || []).map((data) => clueLinesByIndex(index, data));
        return {
            ...model,
            targetLines: targetLines,
            sourceLines: clueLinesByIndex(index, model.sourceLines),
            audioPositions: clueNumbersByIndex(index, model.audioPositions),
        }
    }
    return null;
}; 


export const splitLineByIndex = (index: number, data: string[]): string[] => {
    let ndata = data;
    if (index < data.length) {
        let nxt = data[index].trim();
        const pos = nxt.lastIndexOf(' ');
        if (pos > 0) {
            data[index] = nxt.substring(0, pos);
            nxt = nxt.substring(pos + 1);
        }
        ndata = data.slice(0, index).concat([nxt], data.slice(index));
    }
    return ndata; 
};

export const splitNumberByIndex = (index: number, data: number[]): number[] => {
    let ndata = data;
    if (index < data.length) {
        const aver = (data[index] + (data[index - 1] || 0)) >> 1;
        ndata = data.slice(0, index).concat([aver], data.slice(index));
    }
    return ndata; 
};

export const splitLineInAllSrcAndTargets = (index: number, model: RepetitionModel): RepetitionModel | null => {
    const len = model.sourceLines.length;
    if (index < len) {
        const targetLines = (model.targetLines || []).map((data) => splitLineByIndex(index, data));
        return {
            ...model,
            targetLines: targetLines,
            sourceLines: splitLineByIndex(index, model.sourceLines),
            audioPositions: splitNumberByIndex(index, model.audioPositions),
        }
    }
    return null;
};

export const moveWordInStringArray = (lines: string[], srcIndex: number, dstIndex: number, srcFirstWord: boolean): string[] | null => {
    const n = lines?.length | 0;
    if (srcIndex < n && srcIndex >= 0 && dstIndex >= 0 && dstIndex < n) {
        const src = lines[srcIndex].trim();
        const dst = lines[dstIndex];
        const pos = srcFirstWord ? src.indexOf(' ') : src.lastIndexOf(' ');
        if (pos > 0) {
            const src1 = src.substring(0, pos);
            const src2 = src.substring(pos + 1);
            const nlines = lines.slice();
            if (srcFirstWord) {
                nlines[srcIndex] = src2;
                nlines[dstIndex] += ' ' + src1;
            } else {
                nlines[srcIndex] = src1;
                nlines[dstIndex] = src2 + " " + dst;
            }
            return nlines;
        }
    }
    return null;
};
