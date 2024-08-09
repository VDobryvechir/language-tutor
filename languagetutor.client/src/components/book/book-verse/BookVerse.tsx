import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import translate from '../../../i18n/translate';
import './BookVerse.css';
import { Link } from 'react-router-dom';
import { Resource } from '../../../models/Resource.ts';
import { Book } from '../../../models/Book.ts';
import { TestResources, TestBooks, getBooksForResource, getBookForResource } from '../../../providers/TestMode.ts';
import UserContext from '../../../providers/UserContext';
import RepetitionContent from '../../repetition/repetition-content/RepetitionContent.tsx';
import { loadPartialRepetitionModel } from '../../../providers/BookDataLoad.ts';

interface Props {
    code: string;
};
const BookVerse = ({ code }: Props) => {
    const [ repetitionModel, setRepetitionModel ] = useState({});
    const { resource, book, chapter } = useParams();
    useEffect(() => {
        if (resource && book && chapter) {
            loadPartialRepetitionModel(resource, book, chapter).then((model: Partial<RepetitionModel>) => {
                setRepetitionModel(model);
            });
        }
    }, [resource, book, chapter]);

    return (
        <div className="book-verse">
            {repetitionModel?.targetLines ? < RepetitionContent iniModel={repetitionModel} /> : null}
       </div>
    )

}

export default BookVerse;