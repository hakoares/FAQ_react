using System.Collections.Generic;

namespace faq_react_v2._2.Models
{
    public class QbyCjson
    {
        public long CatId { get; set; }
        public string CatName { get; set; }
        public IList<Question> Questions { get; set; }
    }
}