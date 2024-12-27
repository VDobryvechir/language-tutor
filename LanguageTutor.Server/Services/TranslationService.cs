using LanguageTutor.Server.Services.Translators;
using LanguageTutor.Server.Models;
using System.Text;

namespace LanguageTutor.Server.Services
{
    public class TranslationService
    {
        private readonly string dictionaryFile, wordBookPath;

        public TranslationService(IConfiguration configuration) { 
             dictionaryFile = configuration["Translation:DictionaryFile"]!;
             wordBookPath = configuration["Translation:WordBookPath"]!;
             DictionaryFixer.SetDictionaryPath(wordBookPath);
        }

        public List<string> TranslateToLanguage(string sourceLanguage, string destLanguage, List<string> text, out Dictionary<string,string> wordBook) 
        {
            ITranslator translator = TranslatorFactory.GetTranslatorInstance(sourceLanguage, destLanguage, dictionaryFile, wordBookPath);
            wordBook = [];
            List<string> result = [];
            StringBuilder res = new("", 4000);
            StringBuilder word = new("", 128);
            foreach (string s in text) {
                if (s == null)
                {
                    continue;
                }
                int n = s.Length;
                for (int i = 0; i < n; i++)
                {
                    char c = s[i];
                    if (c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c == '-' && word.Length>0 || c>=128)
                    {
                        word.Append(c);
                    }
                    else
                    {
                        if (word.Length > 0)
                        {
                            ProcessWordTranslation(word.ToString(), res, translator, wordBook);
                            word.Clear();
                        }
                        res.Append(c);
                    }
                }
                if (word.Length > 0)
                {
                    ProcessWordTranslation(word.ToString(), res, translator, wordBook);
                    word.Clear();
                }
                result.Add(res.ToString());
                res.Clear();
            }
            return result;
        }

        public List<List<WordToken>> ConvertLinesToTokens(List<string> text)
        {
            List<List<WordToken>> result = [];
            StringBuilder word = new("", 128);
            StringBuilder res = new("", 128);
            foreach (string s in text)
            {
                if (s == null)
                {
                    continue;
                }
                List<WordToken> tokens = [];
                int n = s.Length;
                for (int i = 0; i < n; i++)
                {
                    char c = s[i];
                    if (c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c == '-' && word.Length > 0 || c >= 128)
                    {
                        if (res.Length > 0)
                        {
                            WordToken token = new() { Token = res.ToString(), Kind = WordKind.IsNonWord };
                            tokens.Add(token);
                            res.Clear();
                        }
                        word.Append(c);
                    }
                    else
                    {
                        if (word.Length > 0)
                        {
                            WordToken token = new () { Token = word.ToString(), Kind = WordKind.IsWord }; 
                            tokens.Add(token);
                            word.Clear();
                        }
                        res.Append(c);
                    }
                }
                if (word.Length > 0)
                {
                    WordToken token = new() { Token = word.ToString(), Kind = WordKind.IsWord };
                    tokens.Add(token);
                    word.Clear();
                }
                if (res.Length > 0)
                {
                    WordToken token = new() { Token = res.ToString(), Kind = WordKind.IsNonWord };
                    tokens.Add(token);
                    res.Clear();
                }
                result.Add(tokens);
            }
            return result;
        }

        public Dictionary<string, DictionaryEntry> CollectWordsForOriginalLanguage(List<List<WordToken>> tokens, string origLang)
        {
            Dictionary<string, DictionaryEntry> words = new Dictionary<string, DictionaryEntry>();
            Dictionary<string, DictionaryEntry> source = DictionaryReader.ReadCachedDictionary(dictionaryFile, origLang);
            foreach (var line in tokens)
            {
                foreach (var word in line)
                {
                    if (word.Kind == WordKind.IsWord)
                    {
                        string key = word.Token!.ToLower();
                        if (source.TryGetValue(key, out var item))
                        {
                            words[key] = item;
                        }
                    }
                }
            }
            return words;
        }

        public List<string> TranslateFromComprehensive(Dictionary<string, DictionaryEntry> words, string origLang, string lang, List<List<WordToken>> tokens)
        {
            ITranslator translator = TranslatorFactory.GetComprehensiveInstance(origLang, lang, wordBookPath, words);
            StringBuilder buf = new StringBuilder();
            List<string> result = new List<string>();
            foreach (var line in tokens) 
            {
                foreach (var word in line)
                {
                    if (word.Kind != WordKind.IsWord)
                    {
                        buf.Append(word.Token!);
                    }
                    else
                    {
                        translator.ProcessWord(word.Token!, buf);
                    }
                }
                result.Add(buf.ToString());
                buf.Clear();
            }
            return result;
        }
        private static void ProcessWordTranslation(string word, StringBuilder res, ITranslator translator, Dictionary<string, string> wordBook)
        {
            translator.ProcessWord(word, res);            
        }
    }
}
