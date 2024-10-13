import { useState, useEffect, useId } from 'react';
import "./InlineTranslation.css";
import { executeCachedTranslation } from '../../../providers/TranslationApi';
import { TranslationResponse } from '../../../models/TranslationResponse';
import { getFilteredStringList } from '../../../providers/StorageUtils';
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
            .then((items: TranslationResponse[]) => {
                if (mounted) {
                    const item = (items || []).find((it: TranslationResponse) => it.language === lang) || { text: "" };
                    setHtmlBlock(item.text && item.text[0] || "");
                }
            })
        return () => { mounted = false; }
    }, [text, lang, srcLang]);
    const styleContent = mode === 1 ? "#"+id+ " .pair-total{display:none}" : "";
    return (
        <div id={id}>
            <style> {styleContent} </style> 
            { prefix ?  <span>{ prefix } </span> : null }
            <span dangerouslySetInnerHTML={{ __html: htmlBlock }}></span>
        </div>
    );
}

export default InlineTranslation;
