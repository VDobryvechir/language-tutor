namespace LanguageTutor.Server.Utils
{
    public class TextUtil
    {
        public static string CleanJsonString(string s)
        {
            if (s.Contains('"'))
            {
                s = s.Replace('"', '`');
            }
            if (s.Contains('\''))
            {
                s = s.Replace('\'', '`');
            }
            if (s.Contains('\\'))
            {
                s = s.Replace('\\', '-');
            }
            if (s.Contains('>'))
            {
                s.Replace('>', '-');
            }
            if (s.Contains('<'))
            {
                s.Replace('<', '-');
            }
            return s;
        }
    }
}
