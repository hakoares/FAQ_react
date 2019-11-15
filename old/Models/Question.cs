using System.Collections.Generic;

namespace FAQ_react.Models
{
    public class Question
    {
        public long Id { get; set; }
        public string Text { get; set; }
        public IList<Answer> Answers { get; set; }
        public int Votes { get; set; }
    }
}