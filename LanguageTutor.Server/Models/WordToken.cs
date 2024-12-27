namespace LanguageTutor.Server.Models
{
    public enum WordKind
    {
        IsWord,
        IsNonWord
    }

    public class WordToken
    {
        public string? Token { get; set; }
        public WordKind? Kind { get; set; }
    }
}
