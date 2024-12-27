using LanguageTutor.Server.Models;
using LanguageTutor.Server.Utils;
using System.Text;

namespace LanguageTutor.Server.Services.Translators
{
    public class OrdBook(string language, string ordUrl, string path, Dictionary<string, DictionaryEntry> dictionary) : ITranslator
    {
        protected readonly string _language = language;
        protected readonly string _ordUrl = ordUrl;
        protected readonly string _path = path;
        protected readonly Dictionary<string, DictionaryEntry> _dictionary = dictionary;


        public virtual void PreProcessWord(string word, StringBuilder res, string tagInfo)
        {
            res.Append("<span ");
            res.Append(tagInfo);
            res.Append('>');
        }

        public virtual void ProcessWord(string word, StringBuilder res)
        {
            string lowerCase = word.ToLower();
            StringBuilder sb = new();
            StringBuilder insider = new();
            if (_dictionary.TryGetValue(lowerCase, out var monoEntry))
            {
                sb.Append(" class='pair-link ");
                sb.Append(monoEntry.Gender);
                sb.Append("' title='");
                string declination = monoEntry.Declination==null ? "": TextUtil.CleanJsonString(String.Join(",", monoEntry.Declination.Values.ToList()));
                sb.Append(declination);
                sb.Append("' ");
                insider.Append(" <span class='pair-total'><span class='pair-declination'>");
                if (monoEntry.Declination!=null)
                {
                    foreach (KeyValuePair<string, string> keyPair in monoEntry.Declination)
                    {
                        string key = keyPair.Key;
                        if (key.Equals("Pres") || key.Equals("Past") || key.Equals("PerfPart"))
                        {
                            insider.Append(" <span class='pair-decline ");
                            insider.Append(keyPair.Key);
                            insider.Append("' title='");
                            insider.Append(keyPair.Key);
                            insider.Append("'>");
                            insider.Append(TextUtil.CleanJsonString(keyPair.Value));
                            insider.Append("</span>");
                        }
                    }
                }
                insider.Append("</span></span>");
            } else
            {
                sb.Append(" class='pair-link' ");
            }
            PreProcessWord(word, res, sb.ToString());
            res.Append(word);
            PostProcessWord(word, res);
            res.Append(insider.ToString());
        }
        public virtual void PostProcessWord(string word, StringBuilder res)
        {
            res.Append("</span>");
        }

    }
}
