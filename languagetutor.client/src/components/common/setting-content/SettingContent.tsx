import React, { useState } from 'react';
import { getLanguageOfStudy, setLanguageOfStudy, getActiveLanguagesAsArray, setActiveLanguagesAsArray } from '../../../providers/StorageUtils';
import translate from '../../../i18n/translate';
import LanguageMultiset from '../language-multiset/LanguageMultiset';
import LanguageChooser from '../language-chooser/LanguageChooser';

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
            <div>
                <span>{translate("Language of study")}</span>
                <LanguageChooser language={language} labelTitle="language" selectorLabel="language"
                    setLanguage={setLanguageAdvanced}
                />
            </div>
            <div>
                <span>{translate("Active languages")}</span>
                <LanguageMultiset languages={activeLanguages} setLanguages={setActiveLanguagesAdvanced} />
            </div>
        </>
 
    );
};

export default SettingContent;