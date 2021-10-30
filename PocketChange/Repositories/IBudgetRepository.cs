using PocketChange.Models;
using System;
using System.Collections.Generic;

namespace PocketChange.Repositories
{
    public interface IBudgetRepository
    {
        void Add(Budget budget);
        void Delete(int id);
        List<Budget> GetAll(string firebaseUserId);
        List<Budget> GetAllByDateRange(int userId, DateTime startDate, DateTime endDate);
        Budget GetById(int id);
        void Update(Budget budget);
    }
}