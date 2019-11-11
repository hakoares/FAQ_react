namespace FAQ_react.Models
{
    public class Answer
    {
        public long Id { get; set; }
        public string Text { get; set; }
        public Question Question { get; set; }
        public int Votes { get; set; }
    }
}