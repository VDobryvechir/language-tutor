import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import translate from '../../../i18n/translate';
import './ChapterChooser.css';
import { Link } from 'react-router-dom';
import { Resource } from '../../../models/Resource.ts';
import { Book } from '../../../models/Book.ts';
import { TestResources, TestBooks, getBooksForResource, getBookForResource } from '../../../providers/TestMode.ts';
import UserContext from '../../../providers/UserContext';


interface Props {
    code: string;
};
const ChapterChooser = ({ code }: Props) => {
    let { resource, book } = useParams();
    const { locale } = useContext(UserContext);
    const bok: Book = getBookForResource(resource, book);
    const n = bok?.chapters || 0;
    const data = [];
    for (let i = 0; i < n; i++) {
        data.push(
            {
                code: "" + i,
                name: ""+i,
            }
        )
    }
    return (
        <div className="chapter-chooser">
            <div className="chapter-chooser__title">{translate(n===0? "Book not found": "Choose chapter")}</div>
            <div className="chapter-chooser__pool">
                {data.map((b) => (
                    <Link to={b.code} key={b.code }>
                        <div className="chapter-chooser__item">
                            <span>{b.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
       </div>
    )

}

export default ChapterChooser;