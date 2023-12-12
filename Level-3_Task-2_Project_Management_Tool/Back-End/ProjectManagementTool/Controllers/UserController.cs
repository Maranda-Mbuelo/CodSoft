// UserController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectManagementTool.Data;
using ProjectManagementTool.Models.DTO;
using ProjectManagementTool.Models.Entites;
using ProjectManagementTool.Repositories;
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
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userRepository.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<User>> GetUserById(Guid userId)
        {
            var user = await _userRepository.GetUserById(userId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser([FromBody] AddUserRequest addUserRequest)
        {
            var user = new User
            {
                Username = addUserRequest.Username,
                Email = addUserRequest.Email,
                Password = addUserRequest.Password
            };

            var createdUser = await _userRepository.CreateUser(user);
            return CreatedAtAction(nameof(GetUserById), new { userId = createdUser.UserId }, createdUser);
        }

        [HttpPut("{userId}")]
        public async Task<ActionResult> UpdateUser(Guid userId, [FromBody] UpdateUserRequest updateUserRequest)
        {
            var existingUser = await _userRepository.GetUserById(userId);
            if (existingUser == null)
            {
                return NotFound();
            }

            // Update user properties based on the request
            // (Assuming UpdateUserRequest has properties for update)
            existingUser.Username = updateUserRequest.Username;
            existingUser.Email = updateUserRequest.Email;
            existingUser.Password = updateUserRequest.Password;

            await _userRepository.UpdateUser(existingUser);
            return NoContent();
        }

        [HttpDelete("{userId}")]
        public async Task<ActionResult> DeleteUser(Guid userId)
        {
            var existingUser = await _userRepository.GetUserById(userId);
            if (existingUser == null)
            {
                return NotFound();
            }

            await _userRepository.DeleteUser(userId);
            return NoContent();
        }
    }
}
