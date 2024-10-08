using LanguageTutor.Server.Services.Translators;
using System.Text;

namespace LanguageTutor.Server.Services
{
    public class TranslationService
    {
        public TranslationService() { } 

        public List<string> TranslateToLanguage(string sourceLanguage, string destLanguage, List<string> text) 
        {
            Translator translator = TranslatorFactory.GetTranslatorInstance(destLanguage, sourceLanguage, "");
            List<string> result = new List<string>();
            StringBuilder res = new StringBuilder("", 4000);
            StringBuilder word = new StringBuilder("", 128);
            foreach (string s in text) {
                int n = s.Length;
                for (int i = 0; i < n; i++)
                {
                    char c = s[i];
                    if (c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c == '-' && word.Length>0 || c>=128)
                    {
                        word.Append(c);
                    }
                    else
                    {
                        if (word.Length > 0)
                        {
                            processWordTranslation(word.ToString(), res, translator);
                            word.Clear();
                        }
                        res.Append(c);
                    }
                }
                if (word.Length > 0)
                {
                    processWordTranslation(word.ToString(), res, translator);
                    word.Clear();
                }
                result.Add(res.ToString());
                res.Clear();
            }
            return result;
        }

        private void processWordTranslation(string word, StringBuilder res, Translator translator)
        {
            translator.ProcessWord(word, res);            
        }
    }
}
