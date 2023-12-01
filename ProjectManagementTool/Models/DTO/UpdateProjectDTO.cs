namespace ProjectManagementTool.Models.DTO
{
    public class UpdateProjectDTO
    {
        public string Description { get; set; }
        public string? ProjectImageURL { get; set; }
        public DateTime? Deadline { get; set; }
        public bool IsCompleted { get; set; }
    }
}
