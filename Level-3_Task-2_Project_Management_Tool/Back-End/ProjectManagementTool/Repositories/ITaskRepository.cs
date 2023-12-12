using ProjectManagementTool.Models.Entites;


namespace ProjectManagementTool.Repositories
{
    public interface ITaskRepository
    {
        Task<IEnumerable<TaskItem>> GetAllTasks();
        Task<IEnumerable<TaskItem>> GetTasksByProjectId(Guid projectId);
        Task<TaskItem> GetTaskById(Guid taskId);
        Task<TaskItem> CreateTask(TaskItem task);
        Task UpdateTask(TaskItem task);
        Task DeleteTask(Guid taskId);
    }
}
