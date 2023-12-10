using ProjectManagementTool.Models.Entites;

namespace ProjectManagementTool.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> GetUserById(Guid userId);
        Task<User> GetUserByEmail(string email);
        Task<User> CreateUser(User user);
        Task UpdateUser(User user);
        Task DeleteUser(Guid userId);
    }
}
