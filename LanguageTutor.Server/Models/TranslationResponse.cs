namespace LanguageTutor.Server.Models
{
    public class TranslationResponse
    {
        public List<string>? Text { get; set; }

        public string? Language { get; set; }
        public Dictionary<string, string>? WordBook { get; set; }
    }
}
