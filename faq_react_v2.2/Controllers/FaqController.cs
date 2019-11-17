using System;
using System.Collections.Generic;
using System.Linq;
using faq_react_v2._2.Data;
using faq_react_v2._2.Models;
using Microsoft.AspNetCore.Mvc;

namespace faq_react_v2._2.Controllers
{
    [ApiController]
    [Route("api")]
    public class FaqController : ControllerBase
    {
        private readonly DbRepository _repository;

        public FaqController(DbRepository repository)
        {
            _repository = repository;
        }


        [Route("all")]
        public JsonResult AllQuestions()
        {
            return new JsonResult(_repository.AllQuestionsSortedByCategory());
        }
        [Route("all/{cat}")]
        public JsonResult AllQuestionsByCat()
        {
            return new JsonResult(_repository.AllQuestionsSortedByCategory());
        }

        [Route("cat")]
        public JsonResult AllCategories()
        {
            return new JsonResult(_repository.AllCategories());

        }
        
        [Route("cat/{id}")]
        public JsonResult QuestionsByCategoryId(int id)
        {
            return new JsonResult(_repository.AllQuestionsByCategory(id));

        }
        
        [Route("q/up/{id}")]
        public JsonResult UpVoteQuestion(int id)
        {
            _repository.UpVoteQuestion(id);
            return new JsonResult("UP VOTE " + id);

        }
        
        [Route("q/down/{id}")]
        public JsonResult DownVoteQuestion(int id)
        {
            _repository.DownVoteQuestion(id);
            return new JsonResult("DOWN VOTE " + id);

        }

        [HttpPost("q/post")]
        public JsonResult PostQuestion([FromBody] Question question)
        {
            if (ModelState.IsValid)
            {
                question.Category = _repository.GetCategoryById(question.Category.Id);
                _repository.SaveQuestion(question);
                return new JsonResult(question.ToString());
            }
            else
            {
                return new JsonResult(question.ToString());

            }
            
        }
        
    }
}