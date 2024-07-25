import React from 'react';
import LanguageName from '../language-name/LanguageName';
import LanguageSelector from '../language-selector/LanguageSelector';
import './Header.css';

const Header = () => (
    <div className="header">
        <LanguageName />
        <LanguageSelector /> 
    </div>
);

export default Header;