namespace LanguageTutor.Server.Models
{
    public class DictionaryEntry
    {
        public Dictionary<string, string>? Tr { get; set; }
        public string? Or { get; set; }

        public string? Gender { get; set; }
        public Dictionary<string, string>? Declination { get; set; }

        public List<DescriptionEntry>? Description { get; set; }

        public List<DescriptionEntry>? DeepDescription { get; set; }

        public List<ExpressionEntry>? Expression { get; set; }

    }

}