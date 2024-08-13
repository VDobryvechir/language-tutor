namespace LanguageTutor.Server.Models
{
    public class VerseTextFile
    {
        public List<List<string>>? TargetLines { get; set; }
        public List<string>? TargetLanguages { get; set; }

        public Dictionary<string, string>? AudioSource { get; set; }
        public Dictionary<string, int[]>? AudioPositions { get; set; }
    }
}
