using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectManagementTool.Data;
using ProjectManagementTool.Models.DTO;
using ProjectManagementTool.Models.Entites;

namespace ProjectManagementTool.Controllers
{
    [Route("mbueloAtCodSoft/api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly ProjectManagementDbContext dbContext;
        public ProjectController(ProjectManagementDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProjects()
        {
            var projects = await dbContext.Projects.ToListAsync();

            return Ok(projects);
        }

        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("GetProjectById")]
        public async Task<IActionResult> GetProjectById(Guid id)
        {
            var project = await dbContext.Projects.FirstOrDefaultAsync(project => project.ProjectId == id);
            
            if(project != null)
            {
                return Ok(project);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddProject(AddProjectRequest Project)
        {
            var project = new Project
            {
                Description = Project.Description,
                ProjectImageURL = Project.ProjectImageURL,
                Deadline = Project.Deadline,
                IsCompleted = Project.IsCompleted,
                Owner = Project.Owner,

            };

            project.ProjectId = Guid.NewGuid();
            await dbContext.Projects.AddAsync(project);
            await dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProjectById), new { id = project.ProjectId }, project);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateProject([FromRoute] Guid id, UpdateProjectDTO updatedProject)
        {
            var existingProject = await dbContext.Projects.FindAsync(id);

            if(existingProject != null)
            {
                existingProject.Description = updatedProject.Description;
                existingProject.Deadline = updatedProject.Deadline;
                existingProject.ProjectImageURL = updatedProject.ProjectImageURL;
                existingProject.IsCompleted = updatedProject.IsCompleted;

                await dbContext.SaveChangesAsync();
                return Ok(existingProject);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteProject(Guid id)
        {
            var existingProject = await dbContext.Projects.FindAsync(id);

            if (existingProject != null)
            {
                dbContext.Remove(existingProject);
                return Ok(existingProject);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
