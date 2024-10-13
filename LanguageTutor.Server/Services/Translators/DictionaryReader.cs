using Newtonsoft.Json;
using LanguageTutor.Server.Models;

namespace LanguageTutor.Server.Services.Translators
{
	public class DictionaryReader {

        private static readonly Dictionary<string, Dictionary<string, DictionaryEntry>> dictionaryCache = [];
        private static readonly Dictionary<string, Dictionary<string, MonoEntry>> dictionaryMonoCache = [];

        public static Dictionary<string, DictionaryEntry> ReadDictionary(string path, string lang) 
        {
		    path = path.Replace("[lang]", lang);
            string json = File.ReadAllText(path);
            Dictionary<string, DictionaryEntry>? result = JsonConvert.DeserializeObject<Dictionary<string, DictionaryEntry>>(json);
            return result ?? ([]);
        }

        public static Dictionary<string, MonoEntry> ReadMonoDictionary(string path, string lang)
        {
            path = path + "mono/m_" + lang + ".json";
            string json = File.ReadAllText(path);
            Dictionary<string, MonoEntry>? result = JsonConvert.DeserializeObject<Dictionary<string, MonoEntry>>(json);
            return result ?? ([]);
        }

        public static Dictionary<string, DictionaryEntry> ReadCachedDictionary(string path, string lang)
        {
                if (dictionaryCache.TryGetValue(lang, out var item))
                {
                     return item;
                } 
                item = ReadDictionary(path, lang);
                dictionaryCache[lang] = item;
                return item;    
        }

        public static Dictionary<string, MonoEntry> ReadCachedMonoDictionary(string path, string lang)
        {
            if (dictionaryMonoCache.TryGetValue(lang, out var item))
            {
                return item;
            }
            item = ReadMonoDictionary(path, lang);
            dictionaryMonoCache[lang] = item;
            return item;
        }

    }

}