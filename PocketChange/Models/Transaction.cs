using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PocketChange.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public string Label { get; set; }
        public string Notes { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public bool IsExpense { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public int BudgetId { get; set; }
        public Budget Budget { get; set; }
    }
}
