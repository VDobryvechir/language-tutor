using System.Text;

namespace LanguageTutor.Server.Services.Translators
{
    public interface ITranslator
    {
        void ProcessWord(string word, StringBuilder res, Dictionary<string, string> wordBook);
    }
}
