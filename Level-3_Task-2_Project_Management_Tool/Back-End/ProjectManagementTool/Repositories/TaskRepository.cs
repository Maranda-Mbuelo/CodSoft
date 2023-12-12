using Microsoft.EntityFrameworkCore;
using ProjectManagementTool.Data;
using ProjectManagementTool.Models.Entites;

namespace ProjectManagementTool.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly ProjectManagementDbContext _context;
        public TaskRepository(ProjectManagementDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskItem>> GetAllTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<IEnumerable<TaskItem>> GetTasksByProjectId(Guid projectId)
        {
            return await _context.Tasks.Where(t => t.ProjectId == projectId).ToListAsync();
        }

        public async Task<TaskItem> GetTaskById(Guid taskId)
        {
            return await _context.Tasks.FirstOrDefaultAsync(x => x.Id == taskId); 
        }

        public async Task<TaskItem> CreateTask(TaskItem task)
        {
            var projectId = task.ProjectId;
            var existingProject = await _context.Projects.FirstOrDefaultAsync(x => x.Id == task.ProjectId);

            if(existingProject != null)
            {
                _context.Tasks.Add(task);
                await _context.SaveChangesAsync();
                return task;
            }

            return task;
        }

        public async Task UpdateTask(TaskItem task)
        {
            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTask(Guid taskId)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            if (task != null)
            {
                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();
            }
        }
    }
}
