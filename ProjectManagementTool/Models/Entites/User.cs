using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ProjectManagementTool.Models.Entites
{
    public class User
    {
        [Key]
        public Guid UserId { get; set; }
        public string Username { get; set; }
        
        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }

        public ICollection<Project>? Projects { get; set; } = new List<Project>();
    }
}
