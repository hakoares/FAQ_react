using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace faq_react_v2._2.Models
{
    public class Category
    {
        public long Id { get; set; }
        
        public string Name { get; set; }
        [JsonIgnore]
        public List<Question> Questions { get; set; } = new List<Question>();

        public override string ToString()
        {
            return " Navn :" + Name;
        }
    }
}