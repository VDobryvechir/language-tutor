import { useContext } from 'react';
import UserContext from '../../../providers/UserContext';
import translate from '../../../i18n/translate.tsx';
import { Link } from 'react-router-dom';
import { TestResources } from '../../../providers/TestMode.ts';
import { Resource } from '../../../models/Resource.ts';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import FlagIcon from '@mui/icons-material/Flag';
import './BookList.css';

interface Props {
    code: string;
};
const BookList = ({  }: Props) => {
    const { locale } = useContext(UserContext) as any;
    return (
        <div className="book-content">
            <div className="book-content__title">{ translate("Choose resource")}</div>
            <List>
                {TestResources.map((resource: Resource, index: number) => (
                    <ListItem key={resource.code} disablePadding>
                        <Link to={resource.code}>
                            <ListItemButton >
                                <ListItemIcon>
                                    {index % 2 === 0 ? <FlagCircleIcon /> : <FlagIcon />}
                                </ListItemIcon>
                                <ListItemText primary={resource.translate[locale] || resource.name} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </div>
    ); 
};

export default BookList;
