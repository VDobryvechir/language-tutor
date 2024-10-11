import BookContent from './components/book/book-content/BookContent';
import BookChooser from './components/book/book-chooser/BookChooser';
import ChapterChooser from './components/book/chapter-chooser/ChapterChooser';
import ResourceContent from './components/book/book-content/ResourceContent';
import TranslateContent from './components/translate/translate-content/TranslateContent';
import WordContent from './components/word/word-content/WordContent';
import SettingContent from './components/common/setting-content/SettingContent';
import CommonRoot from './components/common/common-root/CommonRoot';
import ErrorPage from './components/common/error-page/ErrorPage';
import { createBrowserRouter } from 'react-router-dom';
import RepetitionContent from './components/repetition/repetition-content/RepetitionContent';
import BookVerse from './components/book/book-verse/BookVerse';

const routerPaths = createBrowserRouter([
  {
    path: "/",
    element: <CommonRoot />,
    errorElement: <ErrorPage />,
    children: [
        {
            path: "book",
            element: <BookContent />,
        },
        {
            path: "resource",
            element: <ResourceContent />,
        },
        {
            path: "translate",
            element: <TranslateContent />,
        },
        {
            path: "dictionary",
            element: <WordContent />,
        },
        {
            path: "repetition",
            element: <RepetitionContent startTab={0} iniModel={{}} initVerse={0} baseName="repetition" />,
        },
        {
            path: "repetition/:verse",
            element: <RepetitionContent startTab={0} iniModel={{}} initVerse={-1} baseName="repetition" />,
        },
        {
            path: "settings",
            element: <SettingContent />,
        },
        {
            path: "book/:resource",
            element: <BookChooser code="book" />
        },
        {
            path: "resource/:resource",
            element: <BookChooser code="resource" />
        },
        {
            path: "book/:resource/:book",
            element: <ChapterChooser code="book" />
        },
        {
            path: "resource/:resource/:book",
            element: <ChapterChooser code="resource" />
        },
        {
            path: "book/:resource/:book/:chapter",
            element: <BookVerse code="book" />
        },
        {
            path: "resource/:resource/:book/:chapter",
            element: <BookVerse code="resource" />
        },
        {
            path: "book/:resource/:book/:chapter/:verse",
            element: <BookVerse code="book" />
        },
        {
            path: "resource/:resource/:book/:chapter/:verse",
            element: <BookVerse code="resource" />
        }


    ],
  },
], { basename: '/tutor' });

export default routerPaths;
