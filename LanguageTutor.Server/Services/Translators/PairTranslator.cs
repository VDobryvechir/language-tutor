using Microsoft.Extensions.Primitives;
using System.Text;
using System.Web;

namespace LanguageTutor.Server.Services.Translators
{
    public class PairTranslator(string srcLanguage, string dstLanguage, Dictionary<string, DictionaryEntry> dictionary) : ITranslator
    {
        private readonly string _srcLanguage = srcLanguage, _dstLanguage = dstLanguage;
        private readonly Dictionary<string, DictionaryEntry> _dictionary = dictionary;
        private readonly string translateUrl1 = "https://translate.google.com/details?hl="+ getGeneralLanguage(srcLanguage) + "&sl="+ getGeneralLanguage(srcLanguage) + "&tl="+ getGeneralLanguage(dstLanguage) + "&text=";
        private readonly string translateUrl2 = "&op=translate";

        private static string getGeneralLanguage(string lng)
        {
            return lng == "nb" || lng == "nn" ? "no" : lng;
        }
        public void ProcessWord(string word, StringBuilder res, Dictionary<string, string> wordBook)
        {
            string lowerCase = word.ToLower();
            res.Append("<a target='_blank' href='");
            res.Append(translateUrl1);
            res.Append(HttpUtility.UrlEncode(word));
            res.Append(translateUrl2);
            res.Append("'><span class='pair-orig'>");
            res.Append(word);
            res.Append("</span></a>");
            if (_dictionary.TryGetValue(lowerCase, out var entry)) {
                if (entry.Tr != null && entry.Tr.TryGetValue(_dstLanguage, out string? value))
                {
                    wordBook[word] = value;
                    res.Append("<span class='pair-trans'> ");
                    res.Append(value);
                    res.Append("</span>");
                } else
                {
                    DictionaryFixer.RegisterNewWordTranslation(word, _srcLanguage, _dstLanguage);
                }
            } else {
                DictionaryFixer.RegisterNewWord(word, _srcLanguage);                                
            }
        }
    }
}
