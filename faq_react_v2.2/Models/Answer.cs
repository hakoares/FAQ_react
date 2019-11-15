using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace faq_react_v2._2.Models
{
    public class Answer
    {
        public long Id { get; set; }
        
        [Required]
        public string Text { get; set; }
        
        [Required]
        [JsonIgnore]
        public virtual Question Question { get; set; }
        [JsonIgnore]
        public virtual long QuestionId { get; set; }
        
        public Answer()
        {
        }
    }
}