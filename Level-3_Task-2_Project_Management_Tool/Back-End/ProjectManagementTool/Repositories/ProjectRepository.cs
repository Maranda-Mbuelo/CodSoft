using Microsoft.EntityFrameworkCore;
using ProjectManagementTool.Data;
using ProjectManagementTool.Models.Entites;

namespace ProjectManagementTool.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly ProjectManagementDbContext _context;

        public ProjectRepository(ProjectManagementDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Project>> GetAllProjects()
        {
            return await _context.Projects.ToListAsync();
        }

        public async Task<Project> GetProjectById(Guid projectId)
        {
            return await _context.Projects.FindAsync(projectId);
        }

        public async Task<Project> CreateProject(Project project)
        {
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
            return project;
        }

        public async Task UpdateProject(Project project)
        {
            _context.Projects.Update(project);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProject(Guid projectId)
        {
            var project = await _context.Projects.FindAsync(projectId);
            if (project != null)
            {
                _context.Projects.Remove(project);
                await _context.SaveChangesAsync();
            }
        }
    }
}
