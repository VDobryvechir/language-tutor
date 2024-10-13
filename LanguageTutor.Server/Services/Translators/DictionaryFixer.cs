using SharpCompress.Common;
using System.Collections.Generic;
using System.Text.Json;

namespace LanguageTutor.Server.Services.Translators
{
    public class DictionaryFixer
    {
        private static readonly Dictionary<string, HashSet<string>> cache = [];
        private static string? dictionaryPath, missPath;
        public static void SetDictionaryPath(string path)
        {
            dictionaryPath = path;
            missPath = path + "miss";
            if (!Directory.Exists(missPath))
            {
                Directory.CreateDirectory(missPath);
            }
        }
        public static void RegisterNewWord(string word, string srcLang)
        {
            if (!cache.TryGetValue(srcLang, out var dictSet))
            {
                dictSet = ReadHashSet(srcLang);
                cache[srcLang] = dictSet;
            }
            if (dictSet.Contains(word))
            {
                return;
            }
            dictSet.Add(word);
            UpdateHashSet(dictSet, srcLang);
        }

        public static void RegisterNewWordTranslation(string word, string srcLang, string dstLang)
        {
            RegisterNewWord(word, srcLang + "_" + dstLang);
        }

        public static void RegisterNewMonoWord(string word, string srcLang)
        {
            RegisterNewWord(word,  "mono_" + srcLang);
        }


        private static void UpdateHashSet(HashSet<string> dataSet, string src)
        {
            string filePath = missPath + "/miss_" + src + ".json";
            string jsonString = JsonSerializer.Serialize(dataSet);
            File.WriteAllText(filePath, jsonString);
        }
        private static HashSet<string> ReadHashSet(string src)
        {
            string filePath = missPath + "/miss_" + src + ".json";
            if (!File.Exists(filePath))
            {
                return [];
            }
            string jsonStringFromFile = File.ReadAllText(filePath);
            HashSet<string>? dataSet = JsonSerializer.Deserialize<HashSet<string>>(jsonStringFromFile);
            return dataSet ?? ([]);
        }
    }
}
