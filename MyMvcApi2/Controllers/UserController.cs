using Microsoft.AspNetCore.Mvc;
using MyMvcApi2.Models;
using MyMvcApi2.Models.Data;
using Microsoft.AspNetCore.Identity; //Για να κάνουμε hash το password
using MyMvcApi2.Helpers;
using MyMvcApi2.Dtos;

namespace MyMvcApi2.Controllers
{
    [Route("api/[controller]")] //http://localhost:5033/api/user
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context; //Type AppDbContext -> object EF Core -> connect to db, insert/update/delete etc. Εδώ γίνεται Dependency Injection
                                                // readonly -> η μεταβλητή μπορεί να πάρει τιμή ΜΟΝΟ στο constructor και μετά δεν μπορεί να αλλαχτεί ποτέ

        private readonly JwtHelper _jwtHelper;

        public UserController(AppDbContext context, JwtHelper jwtHelper) //Constructor
        {
            _context = context;
            _jwtHelper = jwtHelper;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            // 1. Βρίσκουμε τον χρήστη
            var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);
            if (user == null)
                return BadRequest("Invalid email or password");

            // 2. Ελέγχουμε το password
            bool valid = PasswordHelper.VerifyPassword(dto.Password, user.Password);
            if (!valid)
                return BadRequest("Invalid email or password");

            // 3. Φτιάχνουμε το JWT token
            var token = _jwtHelper.CreateToken(user);

            return Ok(new { token });
        }



        [HttpPost("register")]  //http://localhost:5033/api/user/register
        public IActionResult Register(RegisterDto dto) // IActionResult -> HTTP Result 
                                                       // User -> ο πίνακας user
        {
            // 1. Check if email already exists
            if (_context.Users.Any(u => u.Email == dto.Email))
            {
                return BadRequest("Email already exists");
            }

            // 2. Hash password
            string hashedPassword = PasswordHelper.HashPassword(dto.Password);

            // 3. Map to User model
            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                Password = hashedPassword
            };


            // 4. Save to database
            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(new
            {
                message = "User created successfully",
                user.Id,
                user.Username,
                user.Email
            });
        }

    }
}