using System.Text;

namespace LanguageTutor.Server.Services.Translators
{
    public class WordBook: Translator
    {
        protected readonly string _language;
        public WordBook(string language) {
            _language = language;
        }

        public virtual void ProcessWord(string word, StringBuilder res)
        {
            res.Append(word);
        }

    }
}
