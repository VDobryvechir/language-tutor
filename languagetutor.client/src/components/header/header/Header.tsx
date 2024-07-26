import React from 'react';
import LanguageName from '../language-name/LanguageName';
import LanguageSelector from '../language-selector/LanguageSelector';
import './Header.css';
import MenuSelector from '../menu-selector/MenuSelector';
import MenuSelection from '../menu-selection/MenuSelector';

const Header = () => (
    <div className="header">
        <LanguageName />
        <LanguageSelector /> 
        <MenuSelection />
        <MenuSelector />
    </div>
);

export default Header;