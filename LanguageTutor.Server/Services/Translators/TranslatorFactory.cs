using LanguageTutor.Server.Models;


namespace LanguageTutor.Server.Services.Translators
{
    public class TranslatorFactory
    {
        public static ITranslator GetTranslatorInstance(string srcLang, string dstLang, string dictionaryPath, string wordBookPath)
        {
            if (dstLang != srcLang)
            {
                Dictionary<string, DictionaryEntry> dictionary = DictionaryReader.ReadCachedDictionary(dictionaryPath, srcLang);
                return new PairTranslator(srcLang, dstLang, dictionary);
            }
            Dictionary<string, MonoEntry> monoDictionary = DictionaryReader.ReadCachedMonoDictionary(wordBookPath, srcLang);

            switch (dstLang)
            {
                case "nb":
                case "nn":
                    return new WordBookNo(dstLang, wordBookPath, monoDictionary);
                default:
                    break;
            }
            return new WordBook(dstLang, "", wordBookPath, monoDictionary);
        }

        public static ITranslator GetComprehensiveInstance(string srcLang, string dstLang, string path, Dictionary<string, DictionaryEntry> dictionary)
        {
            if (dstLang != srcLang)
            {
                return new PairTranslator(srcLang, dstLang, dictionary);
            }

            return new OrdBook(dstLang, "", path, dictionary);
        }

    }
}
