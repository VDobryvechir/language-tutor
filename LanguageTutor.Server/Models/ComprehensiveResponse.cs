namespace LanguageTutor.Server.Models
{
    public class ComprehensiveResponse
    {
        public List<TranslationResponse> Lines { get; set; }
        public Dictionary<string, DictionaryEntry> Words { get; set; }
    }
}
