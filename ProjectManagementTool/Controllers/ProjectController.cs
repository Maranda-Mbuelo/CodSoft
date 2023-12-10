using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using ProjectManagementTool.Models.DTO;
using ProjectManagementTool.Models.Entites;
using ProjectManagementTool.Repositories;

namespace ProjectManagementTool.Controllers
{
    [Route("mbueloAtCodSoft/api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetAllProjects()
        {
            var projects = await _projectRepository.GetAllProjects();
            return Ok(projects);
        }

        [HttpGet("{projectId}")]
        public async Task<ActionResult<Project>> GetProjectById(Guid projectId)
        {
            var project = await _projectRepository.GetProjectById(projectId);
            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }

        [HttpPost]
        public async Task<ActionResult<Project>> CreateProject([FromBody] AddProjectRequest addProjectRequest)
        {
            var project = new Project
            {
                Name = addProjectRequest.Name,
                Description = addProjectRequest.Description,
                /*Tasks = addProjectRequest.Tasks?.Select(Id => new TaskItem { Id = Id }).ToList(),*/
                UserId = addProjectRequest.UserId,
            };

            project.Id = Guid.NewGuid();

            var createdProject = await _projectRepository.CreateProject(project);
            return CreatedAtAction(nameof(GetProjectById), new { projectId = createdProject.Id }, createdProject);
        }

        [HttpPut("{projectId}")]
        public async Task<ActionResult> UpdateProject(Guid projectId, [FromBody] UpdateProjectRequest updateProjectRequest)
        {
            var existingProject = await _projectRepository.GetProjectById(projectId);
            if (existingProject == null)
            {
                return NotFound();
            }

            existingProject.Name = updateProjectRequest.Name;
            existingProject.Description = updateProjectRequest.Description;
            existingProject.UserId = existingProject.UserId;

            await _projectRepository.UpdateProject(existingProject);
            return Ok(existingProject);
        }

        [HttpDelete("{projectId}")]
        public async Task<ActionResult> DeleteProject(Guid projectId)
        {
            var existingProject = await _projectRepository.GetProjectById(projectId);
            if (existingProject == null)
            {
                return NotFound();
            }

            await _projectRepository.DeleteProject(projectId);
            return Ok(existingProject);
        }
    }
}
