import { useState, useEffect, useId } from 'react';
import "./InlineTranslation.css";
import { executeCachedTranslation } from '../../../providers/TranslationApi';
import { TranslationResponse } from '../../../models/TranslationResponse';
import { getFilteredStringList } from '../../../providers/StorageUtils';
import { ComprehensiveResponse } from '../../../models/ComprehensiveResponse';
import DictionaryDialog from '../../common/dictionary-dialog/DictionaryDialog';
import { WordDictionary } from '../../../models/WordDictionary';
export interface Props {
    text: string;
    lang: string; 
    srcLang: string;
    dstLang: string[];
    langFilter?: { [key: string]: boolean; }
    mode?: number;
    prefix?: string; 
};


const InlineTranslation = ({ text, lang, srcLang, dstLang, langFilter, mode, prefix }: Props) => {
    const [htmlBlock, setHtmlBlock] = useState("");
    const [dictionary, setDictionary] = useState({} as WordDictionary);
    const [word, setWord] = useState("");
    const id = useId().replace(':', '_').replace(':','_');
    useEffect(() => {
        let mounted = true;
        setHtmlBlock(lang);
        let dst = getFilteredStringList(dstLang, langFilter);
        if (langFilter && langFilter[srcLang]) {
            let srcItem = dst.find(it => it === srcLang);
            if (!srcItem) {
                dst = [srcLang].concat(dst);
            }
        }
        executeCachedTranslation(srcLang, dst, text)
            .then((data: ComprehensiveResponse) => {
                if (mounted) {
                    const item = (data?.lines || []).find((it: TranslationResponse) => it.language === lang) || { text: "" };
                    setHtmlBlock(item.text && item.text[0] || "");
                }
                if (data?.words) {
                    setDictionary(data.words);
                }
            })
        return () => { mounted = false; }
    }, [text, lang, srcLang]);
    const styleContent = (mode === 1 ? "#" + id + " .pair-total{display:none}" : "") + ".inline-translation__slot{cursor:pointer;}";
    const showDialog = (ev: any) => {
        const ord = (ev?.target ? ev.target.innerText : "").trim();
        if (ord && dictionary) {
            setWord(ord);
        }
        console.log(ord);
    };
    return (
        <div>
            <div id={id}>
                <style> {styleContent} </style>
                {prefix ? <span>{prefix} </span> : null}
                <span className="inline-translation__slot" onClick={showDialog} dangerouslySetInnerHTML={{ __html: htmlBlock }}></span>
            </div>
            <DictionaryDialog lang={srcLang} open={!!word} word={word} entry={word && dictionary && dictionary[word.toLowerCase()] || {}} langFilter={langFilter} onClose={() => setWord("")}></DictionaryDialog>
        </div>
    );
}

export default InlineTranslation;
