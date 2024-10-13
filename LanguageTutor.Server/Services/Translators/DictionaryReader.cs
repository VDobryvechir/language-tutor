using Newtonsoft.Json;

namespace LanguageTutor.Server.Services.Translators
{
	public class DictionaryReader {

        private static readonly Dictionary<string, Dictionary<string, DictionaryEntry>> dictionaryCache = [];

        public static Dictionary<string, DictionaryEntry> ReadDictionary(string path, string lang) 
        {
		    path = path.Replace("[lang]", lang);
            string json = File.ReadAllText(path);
            Dictionary<string, DictionaryEntry>? result = JsonConvert.DeserializeObject<Dictionary<string, DictionaryEntry>>(json);
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
    }

}