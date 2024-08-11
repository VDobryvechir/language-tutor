import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../../../providers/UserContext';
import translate from '../../../i18n/translate';
import { getResourceName, getBookName } from '../../../providers/TestMode';
import './BookInfo.css';

const BookInfo = () => {
    const { locale } = useContext(UserContext);
    const { resource, book, chapter } = useParams();
    const name = resource ? (getResourceName(locale,resource) + (
        book ? ' ' + getBookName(locale,resource,book) + (chapter ? ' ' + chapter : '') : ''
         )): '';
    return (
        <div className="book-info">
            {name}
        </div>
    ); 
};

export default BookInfo;