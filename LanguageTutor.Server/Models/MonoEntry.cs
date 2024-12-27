namespace LanguageTutor.Server.Models
{
    public class MonoEntry
    {
        public string? Gender { get; set; }
        public Dictionary<string,string>? Declination { get; set; }

        public string? Description { get; set; }

        public string? DeepDescription { get; set; }

        public Dictionary<string, MonoEntry>? Expression { get; set; }

    }
}
