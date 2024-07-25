import React, { useContext } from 'react';
import UserContext from '../../../providers/UserContext';
import translate from '../../../i18n/translate';
import './LanguageName.css';

const LanguageName = () => {
    const { locale } = useContext(UserContext);
    return (
        <div className="language-name">
            {translate(locale)}
        </div>
    ); 
};

export default LanguageName;