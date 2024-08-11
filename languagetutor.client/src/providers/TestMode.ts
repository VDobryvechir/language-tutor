﻿import { Resource } from "../models/Resource";
import { Book } from "../models/Book";

export const TestResources: Resource[] = [
    {
        "code": "bible",
        "name": "Bible",
        "translate": { "en": "Bible", "nb": "Bibel", "nn": "Bibel", "uk": "Біблія", "de": "Bibel", "pl": "Biblia", "es": "Biblia", "fr": "Bible", "it": "Bibbia", "sv": "Bibeln", "da": "Bibel", "ru": "Библия", "gr": "βίβλος", "bg": "Библия", "cz": "Bible", "pt": "Bíblia" },
        "options": { "showOrderNo": true },
        "langs": ["en", "nb", "nn", "uk", "de", "pl", "es", "fr", "it", "sv", "da", "ru", "bg", "gr", "pt", "cz"],
        "activeLangs": ["en", "nb", "uk", "de", "nn", "pl"]
    },
    {
        "code": "godinorsk",
        "name": "God i norsk",
        "translate": {},
        "options": { "showOrderNo": false },
        "langs": ["en", "nb", "uk"],
        "activeLangs": ["en", "nb", "uk"]
    }
];

export const TestBooks: Book[] = [{ "resource": "bible", "code": "GEN", "name": "Genesis", "chapters": 50, "translate": { "en": "Genesis", "nb": "1 Mosebok", "nn": "1. Mosebok", "uk": "Буття", "de": "1. Mose", "pl": "I Księga Mojżesza", "es": "Génesis", "fr": "Genèse", "it": "Genesi", "da": "1. Mosebog", "sv": "Första Moseboken", "ru": "Бытие", "gr": "ΓΕΝΕΣΙΣ", "pt": "Gênesis", "bg": "Битие", "cz": "Genesis" } }, { "resource": "bible", "code": "EXO", "name": "Exodus", "chapters": 40, "translate": { "en": "Exodus", "nb": "2 Mosebok", "nn": "2. Mosebok", "uk": "Вихід", "de": "2. Mose", "pl": "II Księga Mojżesza", "es": "Éxodo", "fr": "Exode", "it": "Esodo", "da": "2. Mosebog", "sv": "Andra Moseboken", "ru": "Исход", "gr": "ΕΞΟΔΟΣ", "pt": "Êxodo", "bg": "Изход", "cz": "Exodus" } }, { "resource": "bible", "code": "LEV", "name": "Leviticus", "chapters": 27, "translate": { "en": "Leviticus", "nb": "3 Mosebok", "nn": "3. Mosebok", "uk": "Левит", "de": "3. Mose", "pl": "III Księga Mojżesza", "es": "Levítico", "fr": "Lévitique", "it": "Levitico", "da": "3. Mosebog", "sv": "Tredje Moseboken", "ru": "Левит", "gr": "ΛΕΥΙΤΙΚΟΝ", "pt": "Levítico", "bg": "Левит", "cz": "Leviticus" } }, { "resource": "bible", "code": "NUM", "name": "Numbers", "chapters": 36, "translate": { "en": "Numbers", "nb": "4 Mosebok", "nn": "4. Mosebok", "uk": "Числа", "de": "4. Mose", "pl": "IV Księga Mojżesza", "es": "Números", "fr": "Nombres", "it": "Numeri", "da": "4. Mosebog", "sv": "Fjärde Moseboken", "ru": "Числа", "gr": "ΑΡΙΘΜΟΙ", "pt": "Números", "bg": "Числа", "cz": "Numeri" } }, { "resource": "bible", "code": "DEU", "name": "Deuteronomy", "chapters": 34, "translate": { "en": "Deuteronomy", "nb": "5 Mosebok", "nn": "5. Mosebok", "uk": "Повторення Закону", "de": "5. Mose", "pl": "V Księga Mojżesza", "es": "Deuteronomio", "fr": "Deutéronome", "it": "Deuteronomio", "da": "5. Mosebog", "sv": "Femte Moseboken", "ru": "Второзаконие", "gr": "ΔΕΥΤΕΡΟΝΟΜΙΟΝ", "pt": "Deuteronômio", "bg": "Второзаконие", "cz": "Deuteronomium" } }, { "resource": "bible", "code": "JOS", "name": "Joshua", "chapters": 24, "translate": { "en": "Joshua", "nb": "Josva", "nn": "Josva", "uk": "Iсус Навин", "de": "Josua", "pl": "Księga Jezusa syna Nuna", "es": "Josué", "fr": "Josué", "it": "Giosuè", "da": "Josvabogen", "sv": "Josua", "ru": "Книга Иисуса Навина", "gr": "ΙΗΣΟΥΣ ΤΟΥ ΝΑΥΗ", "pt": "Josué", "bg": "Иисус Навин", "cz": "Jozue" } }, { "resource": "bible", "code": "JDG", "name": "Judges", "chapters": 21, "translate": { "en": "Judges", "nb": "Dommerne", "nn": "Dommarane", "uk": "Книга Суддiв", "de": "Richter", "pl": "Księga Sędziów", "es": "Jueces", "fr": "Juges", "it": "Giudici", "da": "Dommerbogen", "sv": "Domarboken", "ru": "Книга Судей израилевых", "gr": "ΚΡΙΤΑΙ", "pt": "Juízes", "bg": "Съдии", "cz": "Soudců" } }, { "resource": "bible", "code": "RUT", "name": "Ruth", "chapters": 4, "translate": { "en": "Ruth", "nb": "Rut", "nn": "Rut", "uk": "Рут", "de": "Ruth", "pl": "Księga Rut", "es": "Rut", "fr": "Ruth", "it": "Rut", "da": "Ruths Bog", "sv": "Rut", "ru": "Книга Руфи", "gr": "ΡΟΥΘ", "pt": "Rute", "bg": "Рут", "cz": "Rút" } }, { "resource": "bible", "code": "1SA", "name": "1 Samuel", "chapters": 31, "translate": { "en": "1 Samuel", "nb": "1 Samuel", "nn": "1. Samuelsbok", "uk": "1-а Самуїлова", "de": "1. Samuel", "pl": "1 Samuela", "es": "1 Samuel", "fr": "1 Samuel", "it": "1 Samuele", "da": "1. Samuelsbog", "sv": "Första Samuelsboken", "ru": "Первая книга Царств", "gr": "Α΄ ΣΑΜΟΥΗΛ (ή ΒΑΣΙΛΕΙΩΝ Α΄)", "pt": "1Samuel", "bg": "Първо Царе", "cz": "1 Samuel" } }, { "resource": "bible", "code": "2SA", "name": "2 Samuel", "chapters": 24, "translate": { "en": "2 Samuel", "nb": "2 Samuel", "nn": "2. Samuelsbok", "uk": "2-а Самуїлова", "de": "2. Samuel", "pl": "2 Samuela", "es": "2 Samuel", "fr": "2 Samuel", "it": "2 Samuele", "da": "2. Samuelsbog", "sv": "Andra Samuelsboken", "ru": "Вторая книга Царств", "gr": "Β΄ ΣΑΜΟΥΗΛ (ή ΒΑΣΙΛΕΙΩΝ Β΄)", "pt": "2Samuel", "bg": "Второ Царе", "cz": "2 Samuel" } }, { "resource": "bible", "code": "1KI", "name": "1 Kings", "chapters": 22, "translate": { "en": "1 Kings", "nb": "1 Kongebok", "nn": "1. Kongebok", "uk": "1-а царiв", "de": "1. Könige", "pl": "Pierwsza Księga Królów", "es": "1 Reyes", "fr": "1 Rois", "it": "1 Re", "da": "1. Kongebog", "sv": "Första Kungaboken", "ru": "Третья книга Царств", "gr": "Α΄ ΒΑΣΙΛΕΩΝ (ή ΒΑΣΙΛΕΙΩΝ Γ΄)", "pt": "1Reis", "bg": "Трето Царе", "cz": "1 Královská" } }, { "resource": "bible", "code": "2KI", "name": "2 Kings", "chapters": 25, "translate": { "en": "2 Kings", "nb": "2 Kongebok", "nn": "2. Kongebok", "uk": "2-а царiв", "de": "2. Könige", "pl": "Druga Księga Królów", "es": "2 Reyes", "fr": "2 Rois", "it": "2 Re", "da": "2. Kongebog", "sv": "Andra Kungaboken", "ru": "Четвертая книга Царств", "gr": "Β΄ ΒΑΣΙΛΕΩΝ (ή ΒΑΣΙΛΕΙΩΝ Δ΄)", "pt": "2Reis", "bg": "Четвърто Царе", "cz": "2 Královská" } }, { "resource": "bible", "code": "1CH", "name": "1 Chronicles", "chapters": 29, "translate": { "en": "1 Chronicles", "nb": "1 Krønikebok", "nn": "1. Krønikebok", "uk": "1-а хронiки", "de": "1. Chronik", "pl": "1 Kronik", "es": "1 Crónicas", "fr": "1 Chroniques", "it": "1 Cronache", "da": "1. Krønikebog", "sv": "Första Krönikeboken", "ru": "Первая книга Паралипоменон", "gr": "Α΄ ΧΡΟΝΙΚΩΝ (Ή ΠΑΡΑΛΕΙΠΟΜΕΝΩΝ Α΄)", "pt": "1Crônicas", "bg": "Първо Летописи", "cz": "1 Letopisů" } }, { "resource": "bible", "code": "2CH", "name": "2 Chronicles", "chapters": 36, "translate": { "en": "2 Chronicles", "nb": "2 Krønikebok", "nn": "2. Krønikebok", "uk": "2-а хронiки", "de": "2. Chronik", "pl": "2 Kronik", "es": "2 Crónicas", "fr": "2 Chroniques", "it": "2 Cronache", "da": "2. Krønikebog", "sv": "Andra Krönikeboken", "ru": "Вторая книга Паралипоменон", "gr": "Β΄ ΧΡΟΝΙΚΩΝ (Ή ΠΑΡΑΛΕΙΠΟΜΕΝΩΝ Β΄)", "pt": "2Crônicas", "bg": "Второ Летописи", "cz": "2 Letopisů" } }, { "resource": "bible", "code": "EZR", "name": "Ezra", "chapters": 10, "translate": { "en": "Ezra", "nb": "Esra", "nn": "Esra", "uk": "Ездра", "de": "Esra", "pl": "Księga Ezdrasza", "es": "Esdras", "fr": "Esdras", "it": "Esdra", "da": "Ezras Bog", "sv": "Esra", "ru": "Первая книга Ездры", "gr": "ΕΣΔΡΑΣ (ή Β΄ ΕΣΔΡΑΣ)", "pt": "Esdras", "bg": "Ездра", "cz": "Ezdráš" } }, { "resource": "bible", "code": "NEH", "name": "Nehemiah", "chapters": 13, "translate": { "en": "Nehemiah", "nb": "Nehemja", "nn": "Nehemja", "uk": "Неемія", "de": "Nehemia", "pl": "Księga Nehemiasza", "es": "Nehemías", "fr": "Néhémie", "it": "Neemia", "da": "Nehemiasʼ Bog", "sv": "Nehemja", "ru": "Книга Неемии", "gr": "ΝΕΕΜΙΑΣ", "pt": "Neemias", "bg": "Неемия", "cz": "Nehemiáš" } }, { "resource": "bible", "code": "EST", "name": "Esther", "chapters": 10, "translate": { "en": "Esther", "nb": "Ester", "nn": "Ester", "uk": "Естер", "de": "Esther", "pl": "Księga Estery", "es": "Ester", "fr": "Esther", "it": "Ester", "da": "Esters Bog", "sv": "Ester", "ru": "Есфирь", "gr": "ΕΣΘΗΡ", "pt": "Ester", "bg": "Естир", "cz": "Ester" } }, { "resource": "bible", "code": "JOB", "name": "Job", "chapters": 42, "translate": { "en": "Job", "nb": "Job", "nn": "Job", "uk": "Йов", "de": "Hiob", "pl": "Księga Ijoba", "es": "Job", "fr": "Job", "it": "Giobbe", "da": "Jobs Bog", "sv": "Job", "ru": "Книга Иова", "gr": "ΙΩΒ", "pt": "Jó", "bg": "Йов", "cz": "Job" } }, { "resource": "bible", "code": "PSA", "name": "Psalms", "chapters": 150, "translate": { "en": "Psalms", "nb": "Salmene", "nn": "Salmane", "uk": "Псалми", "de": "Psalm", "pl": "Księga Psalmów", "es": "Salmos", "fr": "Psaumes", "it": "Salmi", "da": "Salmernes Bog", "sv": "Psaltaren", "ru": "Псалтирь", "gr": "ΨΑΛΜΟΙ", "pt": "Salmos", "bg": "Псалми", "cz": "Žalmy" } }, { "resource": "bible", "code": "PRO", "name": "Proverbs", "chapters": 31, "translate": { "en": "Proverbs", "nb": "Salomos Ordspråk", "nn": "Ordtaka", "uk": "Приповiстi", "de": "Sprüche", "pl": "Przypowieści Salomona", "es": "Proverbios", "fr": "Proverbes", "it": "Proverbi", "da": "Ordsprogenes Bog", "sv": "Ordspråksboken", "ru": "Притчи Соломона", "gr": "ΠΑΡΟΙΜΙΑΙ", "pt": "Provérbios", "bg": "Притчи", "cz": "Přísloví" } }, { "resource": "bible", "code": "ECC", "name": "Ecclesiastes", "chapters": 12, "translate": { "en": "Ecclesiastes", "nb": "Forkynneren", "nn": "Forkynnaren", "uk": "Екклезiяст", "de": "Prediger", "pl": "Księga Koheleta", "es": "Eclesiastés", "fr": "Ecclésiaste", "it": "Qoelet", "da": "Prædikerens Bog", "sv": "Predikaren", "ru": "Книга Екклезиаста, или Проповедника", "gr": "ΕΚΚΛΗΣΙΑΣΤΗΣ", "pt": "Eclesiastes", "bg": "Еклисиаст", "cz": "Kazatel" } }, { "resource": "bible", "code": "SNG", "name": "Song of Solomon", "chapters": 8, "translate": { "en": "Song of Solomon", "nb": "Høysangen", "nn": "Høgsongen", "uk": "Пiсня над пiснями", "de": "Hoheslied", "pl": "Pieśń nad pieśniami", "es": "Cantares", "fr": "Cantiques", "it": "Cantico dei Cantici", "da": "Højsangen", "sv": "Höga Visan", "ru": "Песнь песней Соломона", "gr": "ΑΣΜΑ ΑΣΜΑΤΩΝ", "pt": "Cântico dos Cânticos", "bg": "Песен на песните", "cz": "Píseň" } }, { "resource": "bible", "code": "ISA", "name": "Isaiah", "chapters": 66, "translate": { "en": "Isaiah", "nb": "Jesaja", "nn": "Jesaja", "uk": "Iсая", "de": "Jesaja", "pl": "Księga Izajasza", "es": "Isaías", "fr": "Esaïe", "it": "Isaia", "da": "Esajasʼ Bog", "sv": "Jesaja", "ru": "Книга пророка Исаии", "gr": "ΗΣΑΪΑΣ", "pt": "Isaías", "bg": "Исаия", "cz": "Izaiáš" } }, { "resource": "bible", "code": "JER", "name": "Jeremiah", "chapters": 52, "translate": { "en": "Jeremiah", "nb": "Jeremia", "nn": "Jeremia", "uk": "Єремiя", "de": "Jeremia", "pl": "Księga Jeremiasza", "es": "Jeremías", "fr": "Jérémie", "it": "Geremia", "da": "Jeremiasʼ Bog", "sv": "Jeremia", "ru": "Книга пророка Иеремии", "gr": "ΙΕΡΕΜΙΑΣ", "pt": "Jeremias", "bg": "Йеремия", "cz": "Jeremiáš" } }, { "resource": "bible", "code": "LAM", "name": "Lamentations", "chapters": 5, "translate": { "en": "Lamentations", "nb": "Klagesangene", "nn": "Klagesongane", "uk": "Плач Єремiї", "de": "Klagelieder", "pl": "Treny", "es": "Lamentaciones", "fr": "Lamentations", "it": "Lamentazioni", "da": "Klagesangene", "sv": "Klagovisorna", "ru": "Плач Иеремии", "gr": "ΘΡΗΝΟΙ", "pt": "Lamentações", "bg": "Плачът на Йеремия", "cz": "Pláč" } }, { "resource": "bible", "code": "EZK", "name": "Ezekiel", "chapters": 48, "translate": { "en": "Ezekiel", "nb": "Esekiel", "nn": "Esekiel", "uk": "Єзекiїль", "de": "Hesekiel", "pl": "Księga Ezechiela", "es": "Ezequiel", "fr": "Ezéchiel", "it": "Ezechiele", "da": "Ezekiels Bog", "sv": "Hesekiel", "ru": "Книга пророка Иезекииля", "gr": "ΙΕΖΕΚΙΗΛ", "pt": "Ezequiel", "bg": "Йезекиил", "cz": "Ezechiel" } }, { "resource": "bible", "code": "DAN", "name": "Daniel", "chapters": 12, "translate": { "en": "Daniel", "nb": "Daniel", "nn": "Daniel", "uk": "Даниїл", "de": "Daniel", "pl": "Księga Daniela", "es": "Daniel", "fr": "Daniel", "it": "Daniele", "da": "Daniels Bog", "sv": "Daniel", "ru": "Книга пророка Даниила", "gr": "ΔΑΝΙΗΛ", "pt": "Daniel", "bg": "Даниил", "cz": "Daniel" } }, { "resource": "bible", "code": "HOS", "name": "Hosea", "chapters": 14, "translate": { "en": "Hosea", "nb": "Hosea", "nn": "Hosea", "uk": "Осiя", "de": "Hosea", "pl": "Księga Ozeasza", "es": "Oseas", "fr": "Osée", "it": "Osea", "da": "Hoseasʼ Bog", "sv": "Hosea", "ru": "Книга пророка Осии", "gr": "ΩΣΗΕ", "pt": "Oseias", "bg": "Осия", "cz": "Ozeáš" } }, { "resource": "bible", "code": "JOL", "name": "Joel", "chapters": 3, "translate": { "en": "Joel", "nb": "Joel", "nn": "Joel", "uk": "Йоїл", "de": "Joel", "pl": "Księga Joela", "es": "Joel", "fr": "Joël", "it": "Gioele", "da": "Joels Bog", "sv": "Joel", "ru": "Книга пророка Иоиля", "gr": "ΙΩΗΛ", "pt": "Joel", "bg": "Йоил", "cz": "Joel" } }, { "resource": "bible", "code": "AMO", "name": "Amos", "chapters": 9, "translate": { "en": "Amos", "nb": "Amos", "nn": "Amos", "uk": "Амос", "de": "Amos", "pl": "Księga Amosa", "es": "Amós", "fr": "Amos", "it": "Amos", "da": "Amosʼ Bog", "sv": "Amos", "ru": "Книга пророка Амоса", "gr": "ΑΜΩΣ", "pt": "Amós", "bg": "Амос", "cz": "Amos" } }, { "resource": "bible", "code": "OBA", "name": "Obadiah", "chapters": 1, "translate": { "en": "Obadiah", "nb": "Obadja", "nn": "Obadja", "uk": "Овдiй", "de": "Obadja", "pl": "Księga Abdjasza", "es": "Abdías", "fr": "Abdias", "it": "Abdia", "da": "Obadiasʼ Bog", "sv": "Obadja", "ru": "Книга пророка Авдия", "gr": "ΟΒΔΙΟΥ", "pt": "Obadias", "bg": "Авдий", "cz": "Abdiáš" } }, { "resource": "bible", "code": "JON", "name": "Jonah", "chapters": 4, "translate": { "en": "Jonah", "nb": "Jona", "nn": "Jona", "uk": "Йона", "de": "Jona", "pl": "Księga Jonasza", "es": "Jonás", "fr": "Jonas", "it": "Giona", "da": "Jonasʼ Bog", "sv": "Jona", "ru": "Книга пророка Ионы", "gr": "ΙΩΝΑΣ", "pt": "Jonas", "bg": "Йона", "cz": "Jonáš" } }, { "resource": "bible", "code": "MIC", "name": "Micah", "chapters": 7, "translate": { "en": "Micah", "nb": "Mika", "nn": "Mika", "uk": "Михей", "de": "Micha", "pl": "Księga Micheasza", "es": "Miqueas", "fr": "Michée", "it": "Michea", "da": "Mikas Bog", "sv": "Mika", "ru": "Книга пророка Михея", "gr": "ΜΙΧΑΙΑΣ", "pt": "Miqueias", "bg": "Михей", "cz": "Micheáš" } }, { "resource": "bible", "code": "NAM", "name": "Nahum", "chapters": 3, "translate": { "en": "Nahum", "nb": "Nahum", "nn": "Nahum", "uk": "Наум", "de": "Nahum", "pl": "Ksiega Nahuma", "es": "Nahúm", "fr": "Nahoum", "it": "Naum", "da": "Nahums Bog", "sv": "Nahum", "ru": "Книга пророка Наума", "gr": "ΝΑΟΥΜ", "pt": "Naum", "bg": "Наум", "cz": "Nahum" } }, { "resource": "bible", "code": "HAB", "name": "Habakkuk", "chapters": 3, "translate": { "en": "Habakkuk", "nb": "Habakkuk", "nn": "Habakkuk", "uk": "Авакум", "de": "Habakuk", "pl": "Księga Habakuka", "es": "Habacuc", "fr": "Habaquq", "it": "Abacuc", "da": "Habakkuks Bog", "sv": "Habackuk", "ru": "Книга пророка Аввакума", "gr": "ΑΒΒΑΚΟΥΜ", "pt": "Habacuque", "bg": "Авакум", "cz": "Abakuk" } }, { "resource": "bible", "code": "ZEP", "name": "Zephaniah", "chapters": 3, "translate": { "en": "Zephaniah", "nb": "Sefanja", "nn": "Sefanja", "uk": "Софонiя", "de": "Zefanja", "pl": "Księga Sofonjasza", "es": "Sofonías", "fr": "Sophonie", "it": "Sofonia", "da": "Zefaniasʼ Bog", "sv": "Sefanja", "ru": "Книга пророка Софонии", "gr": "ΣΟΦΟΝΙΑΣ", "pt": "Sofonias", "bg": "Софония", "cz": "Sofoniáš" } }, { "resource": "bible", "code": "HAG", "name": "Haggai", "chapters": 2, "translate": { "en": "Haggai", "nb": "Haggai", "nn": "Haggai", "uk": "Огiй", "de": "Haggai", "pl": "Księga Aggeusza", "es": "Hageo", "fr": "Aggée", "it": "Aggeo", "da": "Haggajs Bog", "sv": "Haggai", "ru": "Книга пророка Аггея", "gr": "ΑΓΓΑΙΟΣ", "pt": "Ageu", "bg": "Агей", "cz": "Ageus" } }, { "resource": "bible", "code": "ZEC", "name": "Zechariah", "chapters": 14, "translate": { "en": "Zechariah", "nb": "Sakarja", "nn": "Sakarja", "uk": "Захарiя", "de": "Sacharja", "pl": "Księga Zacharjasza", "es": "Zacarías", "fr": "Zacharie", "it": "Zaccaria", "da": "Zakariasʼ Bog", "sv": "Sakarja", "ru": "Книга пророка Захарии", "gr": "ΖΑΧΑΡΙΑΣ", "pt": "Zacarias", "bg": "Захария", "cz": "Zachariáš" } }, { "resource": "bible", "code": "MAL", "name": "Malachi", "chapters": 4, "translate": { "en": "Malachi", "nb": "Malaki", "nn": "Malaki", "uk": "Малахiї", "de": "Maleachi", "pl": "Księga Malachjasza", "es": "Malaquías", "fr": "Malachie", "it": "Malachia", "da": "Malakiasʼ Bog", "sv": "Malaki", "ru": "Книга пророка Малахии", "gr": "ΜΑΛΑΧΙΑΣ", "pt": "Malaquias", "bg": "Малахия", "cz": "Malachiáš" } }, { "resource": "bible", "code": "MAT", "name": "Matthew", "chapters": 28, "translate": { "en": "Matthew", "nb": "Matteus", "nn": "Matteus", "uk": "Вiд Матвiя", "de": "Matthäus", "pl": "Ewangelia Mateusza", "es": "San Mateo", "fr": "Matthieu", "it": "Matteo", "da": "Mattæusevangeliet", "sv": "Matteusevangeliet", "ru": "От Матфея святое благовествование", "gr": "ΚΑΤΑ ΜΑΤΘΑΙΟΝ", "pt": "Mateus", "bg": "Матей", "cz": "Matouš" } }, { "resource": "bible", "code": "MRK", "name": "Mark", "chapters": 16, "translate": { "en": "Mark", "nb": "Markus", "nn": "Markus", "uk": "Вiд Марка", "de": "Markus", "pl": "Ewangelia Marka", "es": "San Marcos", "fr": "Marc", "it": "Marco", "da": "Markusevangeliet", "sv": "Markusevangeliet", "ru": "От Марка святое благовествование", "gr": "ΚΑΤΑ ΜΑΡΚΟΝ", "pt": "Marcos", "bg": "Марк", "cz": "Marek" } }, { "resource": "bible", "code": "LUK", "name": "Luke", "chapters": 24, "translate": { "en": "Luke", "nb": "Lukas", "nn": "Lukas", "uk": "Вiд Луки", "de": "Lukas", "pl": "Ewangelia Łukasza", "es": "San Lucas", "fr": "Luc", "it": "Luca", "da": "Lukasevangeliet", "sv": "Lukasevangeliet", "ru": "От Луки святое благовествование", "gr": "ΚΑΤΑ ΛΟΥΚΑΝ", "pt": "Lucas", "bg": "Лука", "cz": "Lukáš" } }, { "resource": "bible", "code": "JHN", "name": "John", "chapters": 21, "translate": { "en": "John", "nb": "Johannes", "nn": "Johannes", "uk": "Вiд Iвана", "de": "Johannes", "pl": "Ewangelia Jana", "es": "San Juan", "fr": "Jean", "it": "Giovanni", "da": "Johannesevangeliet", "sv": "Johannesevangeliet", "ru": "От Иоанна святое благовествование", "gr": "ΚΑΤΑ ΙΩΑΝΝΗΝ", "pt": "João", "bg": "Йоан", "cz": "Jan" } }, { "resource": "bible", "code": "ACT", "name": "Acts", "chapters": 28, "translate": { "en": "Acts", "nb": "Apostlenes gjerninger", "nn": "Apostelgjerningane", "uk": "Дiї", "de": "Apostelgeschichte", "pl": "Dokonania apostołów", "es": "Hechos", "fr": "Actes", "it": "Atti", "da": "Apostlenes Gerninger", "sv": "Apostlagärningarna", "ru": "Деяния святых апостолов", "gr": "ΠΡΑΞΕΙΣ ΑΠΟΣΤΟΛΩΝ", "pt": "Atos", "bg": "Деяния", "cz": "Skutky" } }, { "resource": "bible", "code": "ROM", "name": "Romans", "chapters": 16, "translate": { "en": "Romans", "nb": "Romerne", "nn": "Romarane", "uk": "До римлян", "de": "Römer", "pl": "List do Rzymian", "es": "Romanos", "fr": "Romains", "it": "Romani", "da": "Romerbrevet", "sv": "Romarbrevet", "ru": "Послание к Римлянам", "gr": "ΠΡΟΣ ΡΩΜΑΙΟΥΣ", "pt": "Romanos", "bg": "Римляни", "cz": "Římanům" } }, { "resource": "bible", "code": "1CO", "name": "1 Corinthians", "chapters": 16, "translate": { "en": "1 Corinthians", "nb": "1 Korinter", "nn": "1. Korintar", "uk": "1-е до коринтян", "de": "1. Korinther", "pl": "Pierwszy list do Koryntian", "es": "1 Corintios", "fr": "1 Corinthiens", "it": "1 Corinzi", "da": "1. Korinterbrev", "sv": "Första Korintierbrevet", "ru": "Первое послание к Коринфянам", "gr": "ΠΡΟΣ ΚΟΡΙΝΘΙΟΥΣ Α΄", "pt": "1Coríntios", "bg": "Първо Коринтяни", "cz": "1 Korintským" } }, { "resource": "bible", "code": "2CO", "name": "2 Corinthians", "chapters": 13, "translate": { "en": "2 Corinthians", "nb": "2 Korinter", "nn": "2. Korintar", "uk": "2-е до коринтян", "de": "2. Korinther", "pl": "Drugi list do Koryntian", "es": "2 Corintios", "fr": "2 Corinthiens", "it": "2 Corinzi", "da": "2. Korinterbrev", "sv": "Andra Korintierbrevet", "ru": "Второе послание к Коринфянам", "gr": "ΠΡΟΣ ΚΟΡΙΝΘΙΟΥΣ Β΄", "pt": "2Coríntios", "bg": "Второ Коринтяни", "cz": "2 Korintským" } }, { "resource": "bible", "code": "GAL", "name": "Galatians", "chapters": 6, "translate": { "en": "Galatians", "nb": "Galaterne", "nn": "Galatarane", "uk": "До галатiв", "de": "Galater", "pl": "List do Galacjan", "es": "Gálatas", "fr": "Galates", "it": "Gàlati", "da": "Galaterbrevet", "sv": "Galaterbrevet", "ru": "Послание к Галатам", "gr": "ΠΡΟΣ ΓΑΛΑΤΑΣ", "pt": "Gálatas", "bg": "Галатяни", "cz": "Galatským" } }, { "resource": "bible", "code": "EPH", "name": "Ephesians", "chapters": 6, "translate": { "en": "Ephesians", "nb": "Efeserne", "nn": "Efesarane", "uk": "До ефесян", "de": "Epheser", "pl": "List do Efezjan", "es": "Efesios", "fr": "Ephésiens", "it": "Efesini", "da": "Efeserbrevet", "sv": "Efesierbrevet", "ru": "Послание к Ефесянам", "gr": "ΠΡΟΣ ΕΦΕΣΙΟΥΣ", "pt": "Efésios", "bg": "Ефесяни", "cz": "Efeským" } }, { "resource": "bible", "code": "PHP", "name": "Philippians", "chapters": 4, "translate": { "en": "Philippians", "nb": "Filipperne", "nn": "Filipparane", "uk": "До филип'ян", "de": "Philipper", "pl": "List do Filippian", "es": "Filipenses", "fr": "Philippiens", "it": "Filippesi", "da": "Filipperbrevet", "sv": "Filipperbrevet", "ru": "Послание к Филиппийцам", "gr": "ΠΡΟΣ ΦΙΛΙΠΠΗΣΙΟΥΣ", "pt": "Filipenses", "bg": "Филипяни", "cz": "Filipským" } }, { "resource": "bible", "code": "COL", "name": "Colossians", "chapters": 4, "translate": { "en": "Colossians", "nb": "Kolosserne", "nn": "Kolossarane", "uk": "До колоссян", "de": "Kolosser", "pl": "List do Kolosan", "es": "Colosenses", "fr": "Colossiens", "it": "Colossesi", "da": "Kolossenserbrevet", "sv": "Kolosserbrevet", "ru": "Послание к Колоссянам", "gr": "ΠΡΟΣ ΚΟΛΟΣΣΑΕΙΣ", "pt": "Colossenses", "bg": "Колосяни", "cz": "Koloským" } }, { "resource": "bible", "code": "1TH", "name": "1 Thessalonians", "chapters": 5, "translate": { "en": "1 Thessalonians", "nb": "1 Tessaloniker", "nn": "1. Tessalonikar", "uk": "1-е до солунян", "de": "1. Thessalonicher", "pl": "Pierwszy list do Tesaloniczan", "es": "1 Tesalonicenses", "fr": "1 Thessaloniciens", "it": "1 Tessalonicesi", "da": "1. Thessalonikerbrev", "sv": "Första Tessalonikerbrevet", "ru": "Первое послание к Фессалоникийцам (Солунянам)", "gr": "ΠΡΟΣ ΘΕΣΣΑΛΟΝΙΚΕΙΣ Α΄", "pt": "1Tessalonicenses", "bg": "Първо Солуняни", "cz": "1 Tesalonickým" } }, { "resource": "bible", "code": "2TH", "name": "2 Thessalonians", "chapters": 3, "translate": { "en": "2 Thessalonians", "nb": "2 Tessaloniker", "nn": "2. Tessalonikar", "uk": "2-е до солунян", "de": "2. Thessalonicher", "pl": "Drugi list do Tesaloniczan", "es": "2 Tesalonicenses", "fr": "2 Thessaloniciens", "it": "2 Tessalonicesi", "da": "2. Thessalonikerbrev", "sv": "Andra Tessalonikerbrevet", "ru": "Второе послание к Фессалоникийцам (Солунянам)", "gr": "ΠΡΟΣ ΘΕΣΣΑΛΟΝΙΚΕΙΣ Β΄", "pt": "2Tessalonicenses", "bg": "Второ Солуняни", "cz": "2 Tesalonickým" } }, { "resource": "bible", "code": "1TI", "name": "1 Timothy", "chapters": 6, "translate": { "en": "1 Timothy", "nb": "1 Timoteus", "nn": "1. Timoteus", "uk": "1-е Тимофiю", "de": "1. Timotheus", "pl": "Pierwszy list do Tymoteusza", "es": "1 Timoteo", "fr": "1 Timothée", "it": "1 Timòteo", "da": "1. Timoteusbrev", "sv": "Första Timoteusbrevet", "ru": "Первое послание к Тимофею", "gr": "Α΄ ΠΡΟΣ ΤΙΜΟΘΕΟΝ", "pt": "1Timóteo", "bg": "Първо Тимотей", "cz": "1 Timoteus" } }, { "resource": "bible", "code": "2TI", "name": "2 Timothy", "chapters": 4, "translate": { "en": "2 Timothy", "nb": "2 Timoteus", "nn": "2. Timoteus", "uk": "2-е Тимофiю", "de": "2. Timotheus", "pl": "Drugi list do Tymoteusza", "es": "2 Timoteo", "fr": "2 Timothée", "it": "2 Timòteo", "da": "2. Timoteusbrev", "sv": "Andra Timoteusbrevet", "ru": "Второе послание к Тимофею", "gr": "Β΄ ΠΡΟΣ ΤΙΜΟΘΕΟΝ", "pt": "2Timóteo", "bg": "Второ Тимотей", "cz": "2 Timoteus" } }, { "resource": "bible", "code": "TIT", "name": "Titus", "chapters": 3, "translate": { "en": "Titus", "nb": "Titus", "nn": "Titus", "uk": "До Тита", "de": "Titus", "pl": "List do Tytusa", "es": "Tito", "fr": "Tite", "it": "Tito", "da": "Titusbrevet", "sv": "Brevet till Titus", "ru": "Послание к Титу", "gr": "ΠΡΟΣ ΤΙΤΟΝ", "pt": "Tito", "bg": "Тит", "cz": "Titus" } }, { "resource": "bible", "code": "PHM", "name": "Philemon", "chapters": 1, "translate": { "en": "Philemon", "nb": "Filemon", "nn": "Filemon", "uk": "До Филимона", "de": "Philemon", "pl": "List do Filemona", "es": "Filemón", "fr": "Philémon", "it": "Filèmone", "da": "Filemonbrevet", "sv": "Brevet till Filemon", "ru": "Послание к Филимону", "gr": "ΠΡΟΣ ΦΙΛΗΜΟΝΑ", "pt": "Filemom", "bg": "Филимон", "cz": "Filemon" } }, { "resource": "bible", "code": "HEB", "name": "Hebrews", "chapters": 13, "translate": { "en": "Hebrews", "nb": "Hebreerne", "nn": "Hebrearane", "uk": "До євреїв", "de": "Hebräer", "pl": "List do Hebrajczyków", "es": "Hebreos", "fr": "Hébreux", "it": "Ebrei", "da": "Hebræerbrevet", "sv": "Hebreerbrevet", "ru": "Послание к Евреям", "gr": "ΠΡΟΣ ΕΒΡΑΙΟΥΣ", "pt": "Hebreus", "bg": "Евреи", "cz": "Židům" } }, { "resource": "bible", "code": "JAS", "name": "James", "chapters": 5, "translate": { "en": "James", "nb": "Jakob", "nn": "Jakob", "uk": "Якова", "de": "Jakobus", "pl": "List Jakóba", "es": "Santiago", "fr": "Jacques", "it": "Giacomo", "da": "Jakobs Brev", "sv": "Jakobs brev", "ru": "Послание Иакова", "gr": "ΙΑΚΩΒΟΥ", "pt": "Tiago", "bg": "Послание на Яков", "cz": "Jakub" } }, { "resource": "bible", "code": "1PE", "name": "1 Peter", "chapters": 5, "translate": { "en": "1 Peter", "nb": "1 Peter", "nn": "1. Peter", "uk": "1-е Петра", "de": "1. Petrus", "pl": "Pierwszy list Piotra", "es": "1 Pedro", "fr": "1 Pierre", "it": "1 Pietro", "da": "1. Petersbrev", "sv": "Första Petrusbrevet", "ru": "Первое послание Петра", "gr": "Α΄ ΠΕΤΡΟΥ", "pt": "1Pedro", "bg": "Първо Петрово", "cz": "1 Petr" } }, { "resource": "bible", "code": "2PE", "name": "2 Peter", "chapters": 3, "translate": { "en": "2 Peter", "nb": "2 Peter", "nn": "2. Peter", "uk": "2-е Петра", "de": "2. Petrus", "pl": "Drugi list Piotra", "es": "2 Pedro", "fr": "2 Pierre", "it": "2 Pietro", "da": "2. Petersbrev", "sv": "Andra Petrusbrevet", "ru": "Второе послание Петра", "gr": "Β΄ ΠΕΤΡΟΥ", "pt": "2Pedro", "bg": "Второ Петрово", "cz": "2 Petr" } }, { "resource": "bible", "code": "1JN", "name": "1 John", "chapters": 5, "translate": { "en": "1 John", "nb": "1 Johannes", "nn": "1. Johannes", "uk": "1-е Iвана", "de": "1. Johannes", "pl": "Pierwszy List Jana", "es": "1 Juan", "fr": "1 Jean", "it": "1 Giovanni", "da": "1. Johannesʼ Brev", "sv": "Första Johannesbrevet", "ru": "Первое послание Иоанна", "gr": "Α΄ ΙΩΑΝΝΟΥ", "pt": "1João", "bg": "Първо Йоаново", "cz": "1 Jan" } }, { "resource": "bible", "code": "2JN", "name": "2 John", "chapters": 1, "translate": { "en": "2 John", "nb": "2 Johannes", "nn": "2. Johannes", "uk": "2-е Iвана", "de": "2. Johannes", "pl": "Drugi List Jana", "es": "2 Juan", "fr": "2 Jean", "it": "2 Giovanni", "da": "2. Johannesʼ Brev", "sv": "Andra Johannesbrevet", "ru": "Второе послание Иоанна", "gr": "Β΄ ΙΩΑΝΝΟΥ", "pt": "2João", "bg": "Второ Йоаново", "cz": "2 Jan" } }, { "resource": "bible", "code": "3JN", "name": "3 John", "chapters": 1, "translate": { "en": "3 John", "nb": "3 Johannes", "nn": "3. Johannes", "uk": "3-е Iвана", "de": "3. Johannes", "pl": "Trzeci List Jana", "es": "3 Juan", "fr": "3 Jean", "it": "3 Giovanni", "da": "3. Johannesʼ Brev", "sv": "Tredje Johannesbrevet", "ru": "Третье послание Иоанна", "gr": "Γ΄ ΙΩΑΝΝΟΥ", "pt": "3João", "bg": "Трето Йоаново", "cz": "3 Jan" } }, { "resource": "bible", "code": "JUD", "name": "Jude", "chapters": 1, "translate": { "en": "Jude", "nb": "Judas", "nn": "Judas", "uk": "Юда", "de": "Judas", "pl": "List Judasa", "es": "Judas", "fr": "Jude", "it": "Giuda", "da": "Judasʼ brev", "sv": "Judas brev", "ru": "Послание Иуды", "gr": "ΙΟΥΔΑ", "pt": "Judas", "bg": "Послание на Юда", "cz": "Juda" } }, { "resource": "bible", "code": "REV", "name": "Revelation", "chapters": 22, "translate": { "en": "Revelation", "nb": "Åpenbaringen", "nn": "Johannes' openberring", "uk": "Об'явлення", "de": "Offenbarung", "pl": "Objawienie spisane przez Jana", "es": "Apocalipsis", "fr": "Apocalypse", "it": "Apocalisse", "da": "Johannesʼ Åbenbaring", "sv": "Uppenbarelseboken", "ru": "Откровение ап. Иоанна Богослова (Апокалипсис)", "gr": "ΑΠΟΚΑΛΥΨΗ ΙΩΑΝΝΟΥ", "pt": "Apocalipse", "bg": "Откровение", "cz": "Zjevení" } }, { "resource": "godinorsk", "code": "1", "name": "1 (A1-A2)", "chapters": 15, "translate": {} }]

export const getBooksForResource = (resource: string): Book[] => {
    const res: Book[] = TestBooks.filter((book: Book) => book.resource === resource) || [];
    return res;
};

export const getBookForResource = (resource: string, code: string): Book | null => {
    const book = TestBooks.find((book: Book) => book.code === code && book.resource === resource) || null;
    return book;
};

export const getResourceName = (locale: string, resource: string): string => {
    const res = TestResources.find((item) => item.code === resource);
    return res ? res.translate[locale] || res.name : '';
}

export const getBookName = (locale: string, resource: string, book: string): string => {
    const res = TestBooks.find((item) => item.code===book && item.resource === resource);
    return res ? res.translate[locale] || res.name : '';
}