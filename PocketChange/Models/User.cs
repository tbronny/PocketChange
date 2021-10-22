using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PocketChange.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string FirebaseUserId { get; set; }

        [Required]
        public string Email { get; set; }

    }
}
