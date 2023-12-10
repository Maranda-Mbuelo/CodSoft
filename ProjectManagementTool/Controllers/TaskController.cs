using Microsoft.AspNetCore.Mvc;
using ProjectManagementTool.Models.DTO;
using ProjectManagementTool.Models.Entites;
using ProjectManagementTool.Repositories;

namespace ProjectManagementTool.Controllers
{
    [Route("mbueloAtCodSoft/api/[controller]")]
    [ApiController]
    public class TaskController : Controller
    {
        private readonly ITaskRepository _taskRepository;

        public TaskController(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetAllTasks()
        {
            var tasks = await _taskRepository.GetAllTasks();
            return Ok(tasks);
        }

        [HttpGet("{taskId}")]
        public async Task<ActionResult<TaskItem>> GetTaskById(Guid taskId)
        {
            var task = await _taskRepository.GetTaskById(taskId);
            if (task != null)
            {
                return Ok(task);
            }
            return NotFound();
        }

        [HttpGet("project/{projectId}")]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasksByProjectId(Guid projectId)
        {
            var tasks = await _taskRepository.GetTasksByProjectId(projectId);
            return Ok(tasks);
        }

        [HttpPost]
        public async Task<ActionResult<TaskItem>> CreateTask([FromBody] AddTaskRequest addTaskRequest)
        {
            var task = new TaskItem
            {
                Title = addTaskRequest.Title,
                Description = addTaskRequest.Description,
                IsCompleted = addTaskRequest.IsCompleted,
                ProjectId = addTaskRequest.ProjectId,
            };

            var createdTask = await _taskRepository.CreateTask(task);
            return CreatedAtAction(nameof(GetTaskById), new { taskId = createdTask.Id }, createdTask);
        }

        [HttpPut("{taskId}")]
        public async Task<ActionResult> UpdateTask(Guid taskId, [FromBody] UpdateTaskRequest updateTaskRequest)
        {
            var existingTask = await _taskRepository.GetTaskById(taskId);
            if (existingTask == null)
            {
                return NotFound();
            }

            // Update task properties based on the request
            // (Assuming UpdateTaskRequest has properties for update)
            existingTask.Title = updateTaskRequest.Title;
            existingTask.Description = updateTaskRequest.Description;
            existingTask.IsCompleted = updateTaskRequest.IsCompleted;
            existingTask.ProjectId = existingTask.ProjectId;

            await _taskRepository.UpdateTask(existingTask);
            return Ok(existingTask);
        }

        [HttpDelete("{taskId}")]
        public async Task<ActionResult> DeleteTask(Guid taskId)
        {
            var existingTask = await _taskRepository.GetTaskById(taskId);
            if (existingTask == null)
            {
                return NotFound();
            }

            await _taskRepository.DeleteTask(taskId);
            return Ok(existingTask);
        }
    }
}
