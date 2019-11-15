using faq_react_v2._2.Models;
using Microsoft.EntityFrameworkCore;

namespace faq_react_v2._2.Data
{
    public class AppContext : DbContext
    {
        
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Category> Categories { get; set; }
        
        
        public AppContext(DbContextOptions options) : base(options)
        {
        }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Question>().HasKey(q => q.Id);
            modelBuilder.Entity<Answer>().HasKey(a => a.Id);
            modelBuilder.Entity<Category>().HasKey(c => c.Id);

            modelBuilder.Entity<Category>()
                .HasMany<Question>(q => q.Questions)
                .WithOne(c => c.Category);
            
            
            modelBuilder.Entity<Question>()
                .HasOne(p => p.Answer)
                .WithOne(b => b.Question)
                .HasForeignKey<Answer>(b => b.QuestionId);
        }
    }
}