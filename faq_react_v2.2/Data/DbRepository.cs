using System.Collections.Generic;
using System.Linq;
using faq_react_v2._2.Models;
using Microsoft.EntityFrameworkCore;

namespace faq_react_v2._2.Data
{
    public class DbRepository
    {

        private readonly AppContext _context;

        public DbRepository(AppContext context)
        {
            _context = context;
        }

        
        public List<QbyCjson> AllQuestionsSortedByCategory()
        {
            var list = _context.Questions
                .Include(a => a.Answer)
                .Include(c => c.Category)
                .GroupBy(c => c.Category)
                .ToArray();
            
            List<QbyCjson> arrayToReturn = new List<QbyCjson>();
            
            foreach (var cat in list)
            {
                QbyCjson item = new QbyCjson
                {
                    CatId = cat.Key.Id,
                    CatName = cat.Key.Name,
                    Questions = cat.Key.Questions
                };
                arrayToReturn.Add(item);
            }

            return arrayToReturn;
        }
        
        public List<QbyCjson> AllQuestionsByCategory(int id)
        {
            var list = _context.Questions
                
                .Include(a => a.Answer)
                .Include(c => c.Category)
                .GroupBy(c => c.Category)
                .ToArray();
            
            List<QbyCjson> arrayToReturn = new List<QbyCjson>();
            
            foreach (var cat in list)
            {
                if (cat.Key.Id == id)
                {
                    QbyCjson item = new QbyCjson
                    {
                        CatId = cat.Key.Id,
                        CatName = cat.Key.Name,
                        Questions = cat.Key.Questions
                    };

                    arrayToReturn.Add(item);
                }
            }

            return arrayToReturn;
        }

        public IList<Category> AllCategories()
        {
            return _context.Categories.ToArray();
        }

        public IList<Question> AllQuestionsByCategoryId(int id)
        {
            return _context.Questions
                .Where(c => c.Category.Id == id)
                .Include(a => a.Answer)
                .Include(c => c.Category)
                .ToArray();
        }

        public void UpVoteQuestion(int id)
        {
            var ans = _context.Questions.SingleOrDefault(i => i.Id == id);
            if (ans != null)
            {
                ans.Votes++;
                _context.Questions.Update(ans);
            }

            _context.SaveChanges();
        }
        
        public void DownVoteQuestion(int id)
        {
            var ans = _context.Questions.SingleOrDefault(i => i.Id == id);
            if (ans != null)
            {
                ans.Votes--;
                _context.Questions.Update(ans);
            }

            _context.SaveChanges();
        }

        public void SaveQuestion(Question question)
        {
            _context.Questions.Add(question);
            _context.SaveChanges();
        }

        public Category GetCategoryById(long id)
        {
            return _context.Categories.SingleOrDefault(i => i.Id == id);
        }

        public void SaveCategory(Category category)
        {
            _context.Categories.Add(category);
            _context.SaveChanges();
        }
    }
}