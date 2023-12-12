using System.ComponentModel.DataAnnotations;

namespace ProjectManagementTool.Models.Entites
{
    public class TaskItem
    {
        [Key]
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }

        public Guid? ProjectId { get; set; } // Foreign key
    }
}
