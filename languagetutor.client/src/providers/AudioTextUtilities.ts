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
