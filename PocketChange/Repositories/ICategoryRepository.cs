using PocketChange.Models;
using System.Collections.Generic;

namespace PocketChange.Repositories
{
    public interface ICategoryRepository
    {
        void Add(Category category);
        void Delete(int id);
        List<Category> GetAll(string firebaseUserId);
        Category GetById(int id);
        void Update(Category category);
    }
}