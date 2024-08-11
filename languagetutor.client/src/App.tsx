import { useState } from 'react';
import './App.css';
import { I18nProvider, LOCALES } from './i18n';

import { UserContextProvider } from './providers/UserContext.tsx';
import { RouterProvider } from 'react-router-dom';
import routerPaths from './routers.tsx';

function App() {
    const [locale, setLocale] = useState(LOCALES.BOKMAL);
    return (
        <I18nProvider locale={locale}>
            <UserContextProvider locale={locale} setLocale={setLocale}>
                <RouterProvider router={routerPaths} />                 
            </UserContextProvider>
       </I18nProvider> 
    );
}

export default App;