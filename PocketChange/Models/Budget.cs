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

        public decimal Total { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }
    }
}
