import { useEffect, useState } from 'react';
import './App.css';
import { I18nProvider, LOCALES } from './i18n';

import { UserContextProvider } from './providers/UserContext.tsx';
import Header from './components/header/header/Header.tsx';
import BookContent from './components/book/book-content/BookContent.tsx';

function App() {
    const [locale, setLocale] = useState(LOCALES.BOKMAL);
    return (
        <I18nProvider locale={locale}>
            <UserContextProvider locale={locale} setLocale={setLocale}>
                <Header />
                <BookContent />                 
            </UserContextProvider>
       </I18nProvider> 
    );
}

export default App;