using PocketChange.Models;
using System.Collections.Generic;

namespace PocketChange.Repositories
{
    public interface IBudgetRepository
    {
        void Add(Budget budget);
        void Delete(int id);
        List<Budget> GetAll(string firebaseUserId);
        Budget GetById(int id);
        void Update(Budget budget);
    }
}