namespace LanguageTutor.Server.Services.Translators
{
    public class TranslatorFactory
    {
        public static Translator GetTranslatorInstance(string dstLang, string srcLang, string configPath)
        {
            if (dstLang != srcLang)
            {
                return new PairTranslator(dstLang, srcLang);
            }
            switch (dstLang)
            {
                case "nb":
                case "nn":
                    return new WordBookNo(dstLang);
            }
            return new WordBook(dstLang);
        }
    }
}
