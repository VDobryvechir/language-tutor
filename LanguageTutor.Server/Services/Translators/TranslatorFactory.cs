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
            switch (dstLang)
            {
                case "nb":
                case "nn":
                    return new WordBookNo(dstLang, wordBookPath);
                default:
                    break;
            }
            return new WordBook(dstLang, "", wordBookPath);
        }
    }
}
