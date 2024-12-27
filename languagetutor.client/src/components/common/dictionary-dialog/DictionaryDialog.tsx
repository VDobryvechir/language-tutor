import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import translate from '../../../i18n/translate';
import { DictionaryEntry, LangDictionary, DescriptionEntry, ExpressionEntry, DeclinationEntry } from '../../../models/WordDictionary';
import { getWordLink, getGenderInfo, declinationPart, getLangsFromDescriptionEntries } from '../../../providers/LanguageUtils';
import "./DictionaryDialog.css";
export interface Props {
    open: boolean;
    lang: string;
    entry: DictionaryEntry;
    word: string;
    langFilter?: { [key: string]: boolean; }
    onClose: () => void;
}
const DictionaryDialog = ({ onClose, word, entry, open, lang, langFilter }: Props) => {
    if (!open) {
        return <></>;
    }
    const [ hideDeclination, setHideDeclination ] = useState(false);
    const [hideByKey, setHideByKey] = useState({} as { [key: string]: boolean });

    const handleClose = () => {
        onClose();
    };

    const showLangMap = (val: LangDictionary | undefined, firstKey: string, firstValue:string) => {
        if (!val) {
            return <></>
        }
        return (
            <div className='dictionary-dialog__language'>
                {firstValue ? 
                    <div>
                        <div className="dictionary-dialog__language-name">{firstKey ? translate(firstKey) : null}</div>
                        <div dangerouslySetInnerHTML={{__html: firstValue} }></div>
                    </div>
                    : null
                }
                {Object.keys(val).map((k: string, index: number) => (
                    <div key={k + "_" + index}>
                        <div className={"dictionary-dialog__language-name dictionary-dialog__lang_" + k}>{k ? translate(k): null}</div>
                        <div className={"dictionary-dialog__lang_" + k}>{val[k]}</div>
                    </div>)
                )}
            </div>);
    }
    const hideByFullKey = (key: string,val: boolean) => {
        setHideByKey({
            ...hideByKey,
            [key]: val,
        })
    };
    const reverseHideByKey = (key: string): void => {
        hideByFullKey(key, !hideByKey[key]);
    };
    const showDescriptionEntryList = (title:string, key:string, val: DescriptionEntry[] | undefined) => {
        if (!val?.length) {
            return <></>;
        }
        const fullKey = title + key;
        if (hideByKey[fullKey]) {
            return (<div className="dictionary-dialog__entries" onClick={()=>hideByFullKey(fullKey, false)}>
                {title ? translate(title): null}
            </div>
            )
        }
        const langs = getLangsFromDescriptionEntries(val, langFilter);
        const ncolumns = langs.length + 1;

        return (<div key={ fullKey} className="dictionary-dialog__entries-table" style={{ gridTemplateColumns: `repeat(${ncolumns}, 1fr)`, overflowX: ncolumns>3 ? "auto" : "hidden"} }>
            <div onClick={() => hideByFullKey(fullKey, true)} className="dictionary-dialog__entries-header _main">{title ? translate(title) : null}</div>
            {
                langs.map((item: string, index: number) => (
                    <div className={"dictionary-dialog__entries-header dictionary-dialog__lang_" + item} key={item + "_" + fullKey + index}>
                        {item ? translate(item) : null }
                    </div>
                ))
            }
            {
                val.map((item: DescriptionEntry, index: number) => (
                    <div key={fullKey + "_" + index }>
                        <div >{item.orig}</div>
                        {langs.map((lang: string) => (
                            <div className={"dictionary-dialog__lang_" + lang} key = {fullKey + lang + index}>
                                {item.tr && item.tr[lang] }
                            </div>
                        ))}
                    </div>
                ))
            }
        </div>);
    };
    const showDeclination = (data: DeclinationEntry | undefined) => {
        if (!data) {
            return <></>;
        }
        return (
            <div className="dictionary-dialog__declination">
                <div className="dictionary-dialog__declination-header" onClick={() => setHideDeclination(!hideDeclination)}>{translate("Declination")}</div>
                { hideDeclination ? null :
                    <div className="dictionary-dialog__declination-content">
                        {Object.keys(data).map((key: string, index: number) => (
                            <div className="dictionary-dialog__declination-item" key={key +"_"+index}>
                                <div className="dictionary-dialog__declination-key">
                                    {translate(declinationPart(key)) }
                                </div>
                                <div className="dictionary-dialog__declination-value">
                                    { data[key] }
                                </div>
                            </div>
                       ))}
                    </div>
                }
            </div>
        );
    };
    const wordLink = getWordLink(lang, word);
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>
                <div className="dictionary-dialog__title">
                    <div>
                        {word}
                        {entry?.or && entry.or !== word ? " (" + entry.or + ") ": null }
                    </div>
                    <div className="dictionary-dialog__title-control">
                        {wordLink ?<span> <a target="_blank" href={wordLink} >  <Avatar onClick={handleClose}>
                            <GTranslateIcon />
                        </Avatar>
                        </a></span>
                            : null
                        }
                        <span> <Avatar onClick={handleClose}>
                            <CloseIcon />
                        </Avatar></span>
                    </div>
                </div>
            </DialogTitle>
            <div className="dictionary-dialog__content" key="dialog-content">
                    <List sx={{ pt: 0 }} key="dialog_list">
                    {entry ?
                        <>
                            {showLangMap(entry.tr, "Grammar", getGenderInfo(entry.gender))}
                            {showDeclination(entry.declination) }
                            {showDescriptionEntryList("Description","", entry.description)}
                            {showDescriptionEntryList("Usage","", entry.deepDescription)}
                            {entry.expression?.length ? 
                                   <div>
                                    <div className="dictionary-dialog__expression" onClick={()=>reverseHideByKey("expression") }>{translate("Expressions")}</div>
                                    {!hideByKey["expression"] ?entry.expression.map((expr: ExpressionEntry, index: number) => (
                                        <div key={index }>
                                            {expr.tran?.tr ? showLangMap(expr.tran.tr, lang, expr.orig) : expr.orig}
                                            {showDescriptionEntryList("Description", "e" + index, expr.description)}
                                            {showDescriptionEntryList("Usage", "e" + index, expr.deepDescription)}
                                        </div>
                                    )) : null
                                        }
                                    </div>
                                : null}
                        </>
                        :
                         < ListItem disableGutters>
                             {translate("Unknown word")}
                         </ListItem>
                    }
                    < ListItem disableGutters>
                        <ListItemButton
                            autoFocus
                            onClick={() => handleClose()}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Close" />
                        </ListItemButton>
                    </ListItem> 

                    </List>
            </div>
        </Dialog>
    );
}

export default DictionaryDialog;
