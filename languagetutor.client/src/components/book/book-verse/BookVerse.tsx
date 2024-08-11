import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import translate from '../../../i18n/translate';
import './BookVerse.css';
import RepetitionContent from '../../repetition/repetition-content/RepetitionContent.tsx';
import { loadPartialRepetitionModel, saveAudioPositions } from '../../../providers/BookDataLoad.ts';
import { showInfo } from '../../../providers/Notifier.ts';
import { RepetitionModel } from '../../../models/RepetitionModel.ts';

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
    const saveAudioPos = (pos: number[]): void => {
        if (resource && book && chapter) {
            saveAudioPositions(resource, book, chapter, pos).then(() => {
                showInfo("Saved")
            });
        }
    };
    return (
        <div className="book-verse">
            {repetitionModel?.targetLines ? < RepetitionContent iniModel={repetitionModel} saveAudioPositions={saveAudioPos} startTab={code==="book"? 2: 1 } /> : null}
       </div>
    )

}

export default BookVerse;