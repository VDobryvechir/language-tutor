import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import translate from '../../../i18n/translate';
import './BookChooser.css';
import { Link } from 'react-router-dom';
import { Resource } from '../../../models/Resource.ts';
import { Book } from '../../../models/Book.ts';
import { TestResources, TestBooks, getBooksForResource } from '../../../providers/TestMode.ts';
import UserContext from '../../../providers/UserContext';


interface Props {
    code: string;
};
const BookChooser = ({ code }: Props) => {
    let { resource } = useParams();
    const { locale } = useContext(UserContext);
    let books = getBooksForResource(resource);
    return (
        <div className="book-chooser">
            <div className="book-chooser__title">{translate("Choose book")}</div>
            <div className="book-chooser__pool">
                {books.map((b: Book) => (
                    <Link to={b.code} key={b.code }>
                        <div className="book-chooser__item">
                            <span>{b.translate[locale] || b.name}</span>
                            <span>{b.chapters}</span>
                        </div>
                    </Link>
                ))}
            </div>
       </div>
    )

}

export default BookChooser;