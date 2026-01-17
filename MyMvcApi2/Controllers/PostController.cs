using Microsoft.AspNetCore.Mvc;
using MyMvcApi2.Models;
using MyMvcApi2.Models.Data;

namespace MyMvcApi2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PostController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Create(Post post) //Αποθηκεύει Post
        {
            _context.Posts.Add(post);
            _context.SaveChanges();
            return Ok(post);
        }

        [HttpGet]
        public IActionResult GetAll()   //Επιστρέφει όλα τα Posts
        {
            return Ok(_context.Posts.ToList());
        }
    }
}
