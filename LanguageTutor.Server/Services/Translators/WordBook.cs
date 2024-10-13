using System.Text;

namespace LanguageTutor.Server.Services.Translators
{
    public class WordBook(string language, string ordUrl, string wordBookPath) : ITranslator
    {
        protected readonly string _language = language;
        protected readonly string _ordUrl = ordUrl, _wordBookPath = wordBookPath;

        public virtual void ProcessWord(string word, StringBuilder res, Dictionary<string, string> wordBook)
        {
            res.Append(word);
        }

    }
}
