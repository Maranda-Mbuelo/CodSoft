using Microsoft.EntityFrameworkCore;
using ProjectManagementTool.Models.Entites;

namespace ProjectManagementTool.Data
{
    public class ProjectManagementDbContext : DbContext
    {
        public ProjectManagementDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the relationship between User and Project entities
            modelBuilder.Entity<Project>()
                .HasOne(p => p.OwnerUser)
                .WithMany(u => u.Projects) // Correct reference to 'Projects' property
                .HasForeignKey(p => p.Owner)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }
}
