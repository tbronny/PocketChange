using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PocketChange.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
