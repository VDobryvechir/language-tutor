
import { PerWordInfo } from '../../../models/RepetitionModel.ts';
import { getActiveLanguagesAsArray } from '../../../providers/StorageUtils.ts';
import './WordPresenter.css';

interface Props {
    language: string;
    shortList: PerWordInfo;
    longList: PerWordInfo;
};

interface Position {
    cls: string;
    txt: string;
};

const WordPresenter = ({ language, shortList, longList }: Props) => {
    if (shortList == null) {
        return <></>;
    }
    const activeLangs = getActiveLanguagesAsArray();
    const words: Position[][] = [];
    const wordIndex: {[key:string]: number} = {};
    for (let lang of activeLangs) {
        const w = shortList?.tr[lang];
        if (!w) {
            continue;
        }
        const wr: string[] = w.split("*");
        for (let wrd of wr) {
            const pos = wrd.indexOf("=");
            if (pos <= 0) {
                continue;
            }
            const keyName = wrd.substring(0, pos).trim();
            const key = keyName.toLowerCase();
            let index = wordIndex[key];
            if (index === undefined) {
                index = words.length;
                words.push([
                    {
                        cls: "_orig",
                        txt: keyName,
                    },
                    {
                        cls: "_sep",
                        txt: " - ",
                    },
                ])
            }
            words[index].push({
                cls: "_tr _tr" + (words[index].length),
                txt: wrd.substring(pos + 1),
            });
        }
    }
    return (
        <div className="word-presenter">
            {words.map((line, ind1) => (
            <div key={ind1}>
                {line.map((spn, ind2) => (
                    <span key={ind2} className={'word-presenter_' + spn.cls}> { spn.txt }</span>
                ))}
            </div>
            ))}
        </div>
    );
};

export default WordPresenter;
