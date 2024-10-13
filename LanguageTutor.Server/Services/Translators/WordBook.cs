using LanguageTutor.Server.Models;
using LanguageTutor.Server.Utils;
using System.Text;

namespace LanguageTutor.Server.Services.Translators
{
    public class WordBook(string language, string ordUrl, string wordBookPath, Dictionary<string, MonoEntry> monoDictionary) : ITranslator
    {
        protected readonly string _language = language;
        protected readonly string _ordUrl = ordUrl, _wordBookPath = wordBookPath;
        protected readonly Dictionary<string, MonoEntry> _monoDictionary = monoDictionary;


        public virtual void PreProcessWord(string word, StringBuilder res, Dictionary<string, string> wordBook, string tagInfo)
        {
            res.Append("<span ");
            res.Append(tagInfo);
            res.Append('>');
        }

        public virtual void ProcessWord(string word, StringBuilder res, Dictionary<string, string> wordBook)
        {
            string lowerCase = word.ToLower();
            StringBuilder sb = new();
            StringBuilder insider = new();
            if (_monoDictionary.TryGetValue(lowerCase, out var monoEntry))
            {
                sb.Append(" class='pair-link ");
                sb.Append(monoEntry.Gender);
                sb.Append("' title='");
                string declination = TextUtil.CleanJsonString(monoEntry.Declination);
                string description = TextUtil.CleanJsonString(monoEntry.Description);
                string deep = TextUtil.CleanJsonString(monoEntry.DeepDescription);
                sb.Append(declination);
                sb.Append(" !!! ");
                sb.Append(description);
                if (deep!=null && deep.Length!=0)
                {
                    sb.Append(" !!!!!!! ");
                    sb.Append(deep);
                }
                sb.Append("' ");
                insider.Append(" <span class='pair-total'><span class='pair-declination'>");
                insider.Append(declination);
                insider.Append("</span> <span class='pair-gender'>");
                insider.Append(monoEntry.Gender);
                insider.Append("</span> <span class='pair-description'>");
                insider.Append(description);
                insider.Append("</span> <span class='pair-deep'>");
                insider.Append(deep);
                insider.Append("</span></span>");
            } else
            {
                sb.Append(" class='pair-link' ");
            }
            PreProcessWord(word, res, wordBook, sb.ToString());
            res.Append(word);
            PostProcessWord(word, res, wordBook);
            res.Append(insider.ToString());
        }

        public virtual void PostProcessWord(string word, StringBuilder res, Dictionary<string, string> wordBook)
        {
            res.Append("</span>");
        }

    }
}
