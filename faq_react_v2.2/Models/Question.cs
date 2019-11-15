using System.ComponentModel.DataAnnotations;

namespace faq_react_v2._2.Models
{
    public class Question
    {
        public long Id { get; set; }
        [Required]
        public string Text { get; set; }
        
        [Required]
        public virtual Category Category { get; set; }
        
        public Answer Answer { get; set; }
        
        public int Votes { get; set; }

        public Question()
        {
        }

        public override string ToString()
        {
            return " Spørsmål :" + Text +
                    " Kategori: " + Category.ToString();
        }
    }
    
}