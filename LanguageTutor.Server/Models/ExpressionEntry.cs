namespace LanguageTutor.Server.Models
{
    public class ExpressionEntry
    {
        public string Orig {  get; set; }   
        public DescriptionEntry? Tran { get; set; }
        public List<DescriptionEntry> Description { get; set; }
        public List<DescriptionEntry> DeepDescription { get; set; }

    }
}
