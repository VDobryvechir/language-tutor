import UserContext from '../providers/UserContext';
import { useContext } from 'react';
import { DEFAULT_LOCALE, LOCALES } from './locales';
import messages from './messages';

export type I18N = (id: string, ...params: string[]) => string;

const setMessagePool = (language: string): I18N => {
	const translation = (messages[language] || messages[DEFAULT_LOCALE]) as Record<string, string>;
    return (id: string, ...params:string[]) => {
            const val = translation[id] || id;
            return params?.length ? params.reduce((res, param, index) => res.replace(`{${index}}`, param), val) : val;    
    };

};

const messagePool = Object.values(LOCALES).reduce((pool: Record<string, I18N>, locale: string) => {
    pool[locale] = setMessagePool(locale);
    return pool;
}, {});


export const useTranslate = (): I18N => {
    const {locale} = useContext(UserContext);
    return messagePool[locale];
}

export const translate = (id: string, ...params: string[]): string => {
    return useTranslate()(id, ...params);
}


export default translate;
