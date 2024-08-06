using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace LanguageTutor.Server.Models
{
    public class Resource
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonPropertyName("id")]
        public string? Id { get; set; }

        [BsonElement("name")]
        [JsonPropertyName("name")]
        public string Name { get; set; } = null!;

        [BsonElement("code")]
        [JsonPropertyName("code")]
        public string Code { get; set; } = null!;


        [BsonElement("translate")]
        [JsonPropertyName("translate")]
        public Dictionary<string, string> Translate { get; set; } = null!;

        [BsonElement("options")]
        [JsonPropertyName("options")]
        public Dictionary<string, object> Options { get; set; } = null!;

        [BsonElement("langs")]
        [JsonPropertyName("langs")]
        public List<string> Langs { get; set; } = null!;

        [BsonElement("activeLangs")]
        [JsonPropertyName("activeLangs")]
        public List<string> ActiveLangs { get; set; } = null!;

    }
}
