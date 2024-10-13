namespace LanguageTutor.Server.Models
{
    public class AudioTextData
    {
        public string? Audio {  get; set; } 
        public AudioTextBlock[]? Data  { get; set; }
        public int[]? Positions { get; set; }
    }
}
