using ProjectManagementTool.Models.Entites;

namespace ProjectManagementTool.Models.DTO
{
    public class AddProjectRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid UserId { get; set; }
    }
}
