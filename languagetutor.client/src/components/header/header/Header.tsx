import LanguageName from '../language-name/LanguageName';
import LanguageSelector from '../language-selector/LanguageSelector';
import './Header.css';
import MenuSelector from '../menu-selector/MenuSelector';
import MenuSelection from '../menu-selection/MenuSelector';
import BookInfo from '../book-info/BookInfo';

const Header = () => (
    <div className="header">
        <div className="header__left">
           <BookInfo />
        </div>
        <div className="header__right">
            <LanguageName />
            <LanguageSelector /> 
            <MenuSelection />
            <MenuSelector />
        </div>
    </div>
);

export default Header;