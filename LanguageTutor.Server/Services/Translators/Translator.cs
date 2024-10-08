using System.Text;

namespace LanguageTutor.Server.Services.Translators
{
    public interface Translator
    {
        void ProcessWord(string word, StringBuilder res);
    }
}
