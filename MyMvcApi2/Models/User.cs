using System.ComponentModel.DataAnnotations;

namespace MyMvcApi2.Models
{
    public class User
    {
        [Key] //Primary Key
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        [EmailAddress] //Ορίζουμε ότι είναι email
        public string Email { get; set; }

        [Required]
        [MinLength(4)]
        public string Password { get; set; }
    }
}