import React, { useState } from 'react';
import { getLanguageOfStudy, setLanguageOfStudy, getActiveLanguagesAsArray, setActiveLanguagesAsArray } from '../../../providers/StorageUtils';
import translate from '../../../i18n/translate';
import LanguageMultiset from '../language-multiset/LanguageMultiset';
import LanguageChooser from '../language-chooser/LanguageChooser';
import './SettingContent.css';

const SettingContent = () => {
    const [language, setLanguage] = useState(getLanguageOfStudy());
    const [activeLanguages, setActiveLanguages] = useState(getActiveLanguagesAsArray());

    const setLanguageAdvanced = (lng: string) => {
        getLanguageOfStudy(lng);
        setLanguage(lng);
    };
    const setActiveLanguagesAdvanced = (langs: string[]) => {
        setActiveLanguagesAsArray(langs);
        setActiveLanguages(langs);
    };
    return (
        <>
            <div className="setting-content__study">
                <div className="setting-content__study-label">{translate("Language of study")}</div>
                <LanguageChooser language={language} labelTitle="" selectorLabel=""
                    setLanguage={setLanguageAdvanced}
                />
            </div>
            <div>
                <div className="setting-content__study-label">{translate("Active languages")}</div>
                <LanguageMultiset languages={activeLanguages} setLanguages={setActiveLanguagesAdvanced} />
            </div>
        </>
 
    );
};

export default SettingContent;