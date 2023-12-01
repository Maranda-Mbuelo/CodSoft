// UserController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectManagementTool.Data;
using ProjectManagementTool.Models.DTO;
using ProjectManagementTool.Models.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectManagementTool.Controllers
{
    [Route("mbueloAtCodSoft/api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ProjectManagementDbContext dbContext;

        public UserController(ProjectManagementDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await dbContext.Users.Include(u => u.Projects).ToListAsync();
            return Ok(users);
        }

        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("GetUserById")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var user = await dbContext.Users.Include(u => u.Projects).FirstOrDefaultAsync(user => user.UserId == id);

            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddUser(AddUserRequest userRequest)
        {
            var user = new User
            {
                Username = userRequest.Username,
                Password = userRequest.Password,
                Email = userRequest.Email
            };

            user.UserId = Guid.NewGuid();
            await dbContext.Users.AddAsync(user);
            await dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserById), new { id = user.UserId }, user);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateUser(Guid id, UpdateUserRequest updatedUser)
        {
            var existingUser = await dbContext.Users
                .Include(u => u.Projects)
                .FirstOrDefaultAsync(u => u.UserId == id);

            if (existingUser != null)
            {
                existingUser.Username = updatedUser.Username;
                existingUser.Password = updatedUser.Password;
                existingUser.Email = updatedUser.Email;

                // Update projects
                if (updatedUser.Projects != null)
                {
                    existingUser.Projects.Clear(); // Clear existing projects

                    foreach (var projectDTO in updatedUser.Projects)
                    {
                        var project = new Project
                        {
                            // Map projectDTO properties to Project properties
                        };

                        existingUser.Projects.Add(project);
                    }
                }

                await dbContext.SaveChangesAsync();
                return Ok(existingUser);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var existingUser = await dbContext.Users
                .Include(u => u.Projects)
                .FirstOrDefaultAsync(u => u.UserId == id);

            if (existingUser != null)
            {
                dbContext.Users.Remove(existingUser);
                await dbContext.SaveChangesAsync();

                return Ok(existingUser);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
