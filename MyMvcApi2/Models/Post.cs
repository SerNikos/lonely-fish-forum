using System.ComponentModel.DataAnnotations;

namespace MyMvcApi2.Models
{
    public class Post
    {
        [Key] //Primary Key
        public int postId { get; set; }

        [Required]
        public string postText { get; set; }
    }
}