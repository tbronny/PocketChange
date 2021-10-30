using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PocketChange.Models
{
    public class Budget
    {
        public int Id { get; set; }

        public string Label { get; set; }

        public decimal MonthlyGoal { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public List<Transaction> Transactions { get; set; }

        //public decimal ExpensesTotal
        //{
        //    get
        //    {
        //        return Transactions.Where(t => t.IsExpense == true).Select(t => t.Amount).Sum();
        //    }
        //}

        //public decimal IncomeTotal
        //{
        //    get
        //    {
        //        return Transactions.Where(t => t.IsExpense == false).Select(t => t.Amount).Sum();
        //    }
        //}

        //public decimal LeftToSpend
        //{
        //    get
        //    {
        //        return MonthlyGoal - ExpensesTotal;
        //    }
        //}

        //public decimal CurrentMonthlySavings
        //{
        //    get
        //    {
        //        return IncomeTotal - ExpensesTotal;
        //    }
        //}
    }
}
