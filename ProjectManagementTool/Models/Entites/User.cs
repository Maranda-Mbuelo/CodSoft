using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ProjectManagementTool.Models.Entites
{
    public class User
    {
        public Guid UserId { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }
        
        [EmailAddress]
        public string Email { get; set; }

        [JsonIgnore] // this attribute to break circular reference
        public List<Project>? Projects { get; set; }
    }
}
