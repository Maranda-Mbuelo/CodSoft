using ProjectManagementTool.Models.Entites;

namespace ProjectManagementTool.Repositories
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetAllProjects();
        Task<Project> GetProjectById(Guid projectId);
        Task<Project> CreateProject(Project project);
        Task UpdateProject(Project project);
        Task DeleteProject(Guid projectId);
    }
}
