import translate from '../../../i18n/translate';
import './MenuSelection.css';
import { MenuListData } from '../menu-selector/MenuList';
import { useLocation } from 'react-router-dom';

const MenuSelection = () => {
    let location = useLocation();
    let name = location.pathname ? location.pathname.substring(1) : '';
    let pos = name.indexOf('/');
    if (pos >= 0) {
        name = name.substring(0, pos);
    }
    const item = MenuListData.find((elem) => elem.action === name);
    if (item) {
        name = item.name;
    }
    return (
        <div className="menu-selection">
            {name && translate(name)}
        </div>
    ); 
};

export default MenuSelection;