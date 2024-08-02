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

interface  multiplyByFractionProps {
    amount: number;
    time: string;
};

const multiplyByFractionOf60 = (factor:number, {amount, time}: multiplyByFractionProps) => {
    time = time.trim();
    const n = time.length;
    if (n && time[n-1]>='0' && time[n-1]<='9') {
        const pos = time.lastIndexOf(":");
        if (pos>=0) {
            amount += parseInt(time.substring(pos+1)) * factor;
            time = time.substring(0, pos);
        } else {
            amount += parseInt(time) * factor;
            time = "";
        }
    }
};

export const timeToMiliseconds = (time: string): number => {
    if (!time) {
        return 0;
    }
    let amount = 0;
    const pos = time.lastIndexOf(".");
    if (pos>=0) {
        amount = +(time.substring(pos+1).trim());
        time = time.substring(0, pos);
    } 
    const data:multiplyByFractionProps = {amount, time};
    multiplyByFractionOf60(1000, data);
    multiplyByFractionOf60(60000, data);
    multiplyByFractionOf60(3600000, data);
    return data.amount;
}
