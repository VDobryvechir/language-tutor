import BookContent from './components/book/book-content/BookContent';
import TranslateContent from './components/translate/translate-content/TranslateContent';
import WordContent from './components/word/word-content/WordContent';
import SettingContent from './components/common/setting-content/SettingContent';
import CommonRoot from './components/common/common-root/CommonRoot';
import ErrorPage from './components/common/error-page/ErrorPage';
import { createBrowserRouter } from 'react-router-dom';
import RepetitionContent from './components/repetition/repetition-content/RepetitionContent';

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
            path: "translate",
            element: <TranslateContent />,
        },
        {
            path: "dictionary",
            element: <WordContent />,
        },
        {
            path: "repetition",
            element: <RepetitionContent />,
        },
        {
            path: "settings",
            element: <SettingContent />,
        },
    ],
  },
]);

export default routerPaths;
