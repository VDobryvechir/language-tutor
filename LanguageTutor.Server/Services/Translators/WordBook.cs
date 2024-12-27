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
            if (_monoDictionary.TryGetValue(lowerCase, out var monoEntry))
            {
                sb.Append(" class='pair-link ");
                sb.Append(monoEntry.Gender);
                sb.Append("' title='");
                string declination = TextUtil.CleanJsonString(String.Join(",", monoEntry.Declination.Values.ToList()));
                string description = TextUtil.CleanJsonString(monoEntry.Description);
                string deep = TextUtil.CleanJsonString(monoEntry.DeepDescription);
                sb.Append(declination);
                sb.Append(" ! ");
                sb.Append(description);
                if (deep!=null && deep.Length!=0)
                {
                    sb.Append(" !! ");
                    sb.Append(deep);
                }
                sb.Append("' ");
                insider.Append(" <span class='pair-total'><span class='pair-declination'>");
                foreach (KeyValuePair<string, string> keyPair in monoEntry.Declination)
                {
                    insider.Append(" <span class='pair-decline "); 
                    insider.Append(keyPair.Key);
                    insider.Append("' title='");
                    insider.Append(keyPair.Key);
                    insider.Append("'>");
                    insider.Append(TextUtil.CleanJsonString(keyPair.Value));
                    insider.Append("</span>");
                }    
                insider.Append("</span> <span class='pair-gender'>");
                insider.Append(monoEntry.Gender);
                insider.Append("</span> <span class='pair-description'>");
                insider.Append(description);
                insider.Append("</span> <span class='pair-deep'>");
                insider.Append(deep);
                insider.Append("</span> <span class='pair-expression'>");
                ProcessExpression(insider, monoEntry.Expression);
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

        private static void ProcessExpression(StringBuilder sb, Dictionary<string,MonoEntry>? expr)
        {
            if (expr == null) 
                return;
            foreach(KeyValuePair<string,MonoEntry> kvp in expr)
            { 
                sb.Append(" <span class='pair-expr-entry'><span class='pair-expr-key'>");
                sb.Append(kvp.Key);
                if (kvp.Value != null && kvp.Value.Description != null)
                {
                    sb.Append(" </span><span class='pair-expr-description'>");
                    sb.Append(TextUtil.CleanJsonString(kvp.Value.Description));
                }
                if (kvp.Value != null && kvp.Value.DeepDescription != null)
                {
                    sb.Append(" </span><span class='pair-expr-deep'>");
                    sb.Append(TextUtil.CleanJsonString(kvp.Value.DeepDescription));
                }
                sb.Append(" </span></span>");
            }
        }
        public virtual void PostProcessWord(string word, StringBuilder res)
        {
            res.Append("</span>");
        }

    }
}
