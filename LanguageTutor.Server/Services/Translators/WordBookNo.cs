using System.Text;
using System.Web;

namespace LanguageTutor.Server.Services.Translators
{
    public class WordBookNo: WordBook 
    {
        private string _ordUrl;
        public WordBookNo(string language):base(language)  
        {
            _ordUrl = "https://ordbokene.no/ukr/" + (language == "nb"? "bm": "nn") + "/";
        }
        public override void ProcessWord(string word, StringBuilder res)
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
