using PocketChange.Models;
using System.Collections.Generic;

namespace PocketChange.Repositories
{
    public interface ITransactionRepository
    {
        List<Transaction> GetAll(int budgetId);
        Transaction GetById(int id);
        void Add(Transaction transaction);
        void Update(Transaction transaction);
        void Delete(int id);
    }
}