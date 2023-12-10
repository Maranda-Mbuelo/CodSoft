using ProjectManagementTool.Models.Entites;

namespace ProjectManagementTool.Models.DTO
{
    public class UpdateTaskRequest
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }

        public Guid ProjectId { get; set; } // Foreign key
    }
}
