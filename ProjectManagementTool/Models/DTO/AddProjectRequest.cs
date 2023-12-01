namespace ProjectManagementTool.Models.DTO
{
    public class AddProjectRequest
    {
        public string Description { get; set; }
        public string? ProjectImageURL { get; set; }
        public DateTime? Deadline { get; set; }
        public bool IsCompleted { get; set; }
        public Guid Owner { get; set; }
    }
}
