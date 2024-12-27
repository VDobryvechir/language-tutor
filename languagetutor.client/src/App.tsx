import './App.css';
import { DEFAULT_LOCALE } from './i18n/locales.ts';

import { UserContextProvider } from './providers/UserContext.tsx';
import { RouterProvider } from 'react-router-dom';
import routerPaths from './routers.tsx';

function App() {
    return (
        <UserContextProvider defaultLocale={DEFAULT_LOCALE}>
            <RouterProvider router={routerPaths} />                 
       </UserContextProvider>
    );
}

export default App;