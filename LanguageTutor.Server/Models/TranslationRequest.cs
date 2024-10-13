namespace LanguageTutor.Server.Models
{
    public class TranslationRequest
    {
        public string? OriginalLanguage { get; set; }    
        public List<string>? Text { get; set; }
        public string[]? Languages { get; set; }    
    }
}
