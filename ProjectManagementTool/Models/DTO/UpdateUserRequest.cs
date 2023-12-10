using System.ComponentModel.DataAnnotations;

namespace ProjectManagementTool.Models.DTO
{
    public class UpdateUserRequest
    {
        public string Username { get; set; }

        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
