using System.Collections.Generic;
using System.Linq;
using FAQ_react.Data;
using FAQ_react.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace FAQ_react.Controllers
{
    [ApiController]
    [Route("faq")]
    public class FaqController : ControllerBase
    {
        private readonly AppContext _context;

        public FaqController(AppContext context)
        {
            _context = context;
        }


        public void AllQuestions()
        {
            
            var q = new Question
            {
                Text = "Hvordan går dette?",
                Answers = new List<Answer>(),
                Votes = 0

            };
            
            
            var a = new Answer
            {
                Text = "Bra!",
                Question = null,
                Votes = 0
            };
            
            q.Answers.Add(a);
            
            _context.Answers.Add(a);
            _context.Questions.Add(q);
            _context.SaveChanges();

        }
    }
}