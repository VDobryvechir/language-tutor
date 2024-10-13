using LanguageTutor.Server.Models;
using System.Text;
using System.Web;

namespace LanguageTutor.Server.Services.Translators
{
    public class WordBookNo(string language, string wordBookPath, Dictionary<string, MonoEntry> monoDictionary) : 
        WordBook(language, "https://ordbokene.no/ukr/" + (language == "nb" ? "bm" : "nn") + "/", wordBookPath, monoDictionary) 
    {
        public override void PreProcessWord(string word, StringBuilder res, Dictionary<string, string> wordBook, string tagInfo)
        {
            res.Append("<a target='_blank' href='");
            res.Append(_ordUrl);
            string w = HttpUtility.UrlEncode(word);
            res.Append(w);
            res.Append("' ");
            res.Append(tagInfo);
            res.Append('>');
        }

        public override void PostProcessWord(string word, StringBuilder res, Dictionary<string, string> wordBook)
        {
            res.Append("</a>");
        }

    }
}
