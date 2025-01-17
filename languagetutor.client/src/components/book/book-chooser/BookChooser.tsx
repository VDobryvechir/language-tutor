import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import translate from '../../../i18n/translate';
import './BookChooser.css';
import { Link } from 'react-router-dom';
import { Book } from '../../../models/Book.ts';
import { getBooksForResource } from '../../../providers/TestMode.ts';
import UserContext from '../../../providers/UserContext';


interface Props {
    code: string;
};
const BookChooser = ({ }: Props) => {
    let { resource } = useParams();
    const { locale } = useContext(UserContext) as any;
    if (!resource) {
        return <></>;
    }
    let books = getBooksForResource(resource);
    return (
        <div className="book-chooser">
            <div className="book-chooser__title">{translate("Choose book")}</div>
            <div className="book-chooser__pool">
                {books.map((b: Book) => (
                    <Link to={b.code} key={b.code }>
                        <button className="book-chooser__item">
                            <div className="book-chooser__item-title"><span>{b.translate[locale] || b.name}</span></div>
                            <span className="book-chooser__item-info">{b.chapters}</span>
                        </button>
                    </Link>
                ))}
            </div>
       </div>
    )

}

export default BookChooser;