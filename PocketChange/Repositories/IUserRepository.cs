using PocketChange.Models;
using System.Collections.Generic;

namespace PocketChange.Repositories
{
    public interface IUserRepository
    {
        void Add(User user);
        List<User> GetAllUsers();
        User GetByFirebaseUserId(string firebaseUserId);
    }
}