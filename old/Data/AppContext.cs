using FAQ_react.Models;
using Microsoft.EntityFrameworkCore;

namespace FAQ_react.Data
{
    public class AppContext : DbContext
    {
        
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        
        
        public AppContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Question>().HasKey(q => q.Id);
            modelBuilder.Entity<Answer>().HasKey(a => a.Id);

            modelBuilder.Entity<Question>().HasMany(a => a.Answers).WithOne(q => q.Question).OnDelete(DeleteBehavior.Cascade);

        }
    }
}