import { IntlProvider } from 'react-intl';

import { LOCALES } from './locales';
import messages from './messages';

interface Props {
    children: any;
    locale: string;
};

const Provider = ({children, locale = LOCALES.ENGLISH}: Props) => (
   <IntlProvider
     locale={locale}
     textComponent={Fragment}
     messages={messages[locale]}
   >
    {children}
   </IntlProvider>
)

export default Provider;
