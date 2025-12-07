
namespace MyMvcApi2.Helpers
{
    public static class PasswordHelper
    {
        // Hash password για αποθήκευση
        public static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        // Έλεγχος κωδικού για login
        public static bool VerifyPassword(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }
    }
}