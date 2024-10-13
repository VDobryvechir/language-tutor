import { useState, useEffect } from 'react';
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
};


const InlineTranslation = ({ text, lang, srcLang, dstLang, langFilter }: Props) => {
    const [htmlBlock, setHtmlBlock] = useState("");

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
                    const item = (items || []).find((it: TranslationResponse) => it.language === lang) || {text:""};
                    setHtmlBlock(item.text && item.text[0] || "");
                }
            })
        return () => { mounted = false; }
    }, [text, lang, srcLang])
    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: htmlBlock }}></div>
        </>
    );
}

export default InlineTranslation;
