using System.Text;
using System.Web;

namespace LanguageTutor.Server.Services.Translators
{
    public class WordBookNo(string language, string wordBookPath) : WordBook(language, "https://ordbokene.no/ukr/" + (language == "nb" ? "bm" : "nn") + "/", wordBookPath) 
    {
        public override void ProcessWord(string word, StringBuilder res, Dictionary<string, string> wordBook)
        {
            res.Append("<a target='_blank' href='");
            res.Append(_ordUrl);
            string w = HttpUtility.UrlEncode(word);
            res.Append(w);
            res.Append("'>");
            res.Append(word);
            res.Append("</a>");
        }
    }
}
