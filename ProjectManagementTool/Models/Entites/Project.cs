using System.Text.Json.Serialization;

namespace ProjectManagementTool.Models.Entites
{
    public class Project
    {
        public Guid ProjectId { get; set; }
        public string Description { get; set; }
        public string? ProjectImageURL { get; set; }
        public DateTime? Deadline { get; set; }
        public bool IsCompleted { get; set; }
        public Guid? Owner { get; set; }

        [JsonIgnore] // this attribute to break circular reference
        public User OwnerUser { get; set; } // Navigation property for the owner
    }
}
