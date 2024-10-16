﻿using LanguageTutor.Server.Services.Translators;
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

        private static void ProcessWordTranslation(string word, StringBuilder res, ITranslator translator, Dictionary<string, string> wordBook)
        {
            translator.ProcessWord(word, res, wordBook);            
        }
    }
}
