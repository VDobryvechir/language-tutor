using System.Text;

namespace LanguageTutor.Server.Services.Translators
{
    public class PairTranslator: Translator
    {
        private string _srcLanguage, _dstLanguage;
        public PairTranslator(string srcLanguage, string dstLanguage) {
            _srcLanguage = srcLanguage;
            _dstLanguage = dstLanguage;
        }

        public void ProcessWord(string word, StringBuilder res)
        {
            res.Append(word);
        }
    }
}
