using System.Text.Json.Serialization;

namespace LanguageTutor.Server.Models
{
    public class VerseTextFile
    {
        [JsonPropertyName("targetLines")]
        public List<List<string>>? TargetLines { get; set; }
        [JsonPropertyName("targetLanguages")]
        public List<string>? TargetLanguages { get; set; }
        [JsonPropertyName("audioSource")]
        public Dictionary<string, string>? AudioSource { get; set; }
        [JsonPropertyName("audioPositions")]
        public Dictionary<string, int[]>? AudioPositions { get; set; }
    }
}
