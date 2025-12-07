using Microsoft.EntityFrameworkCore;

namespace MyMvcApi2.Models.Data
{
    public class AppDbContext : DbContext //Κληρονομεί ORM δυνατότηες
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) //Δέχεται τις ρυθμίσεις σύνδεσης(connection string, provider SQL Server κ.λπ.).
        {
        }

        // Κάθε DbSet<T> είναι ένας πίνακας στη βάση
        public DbSet<User> Users { get; set; } //Δηλώνει ότι θα υπάρχει πίνακας Users στη βάση. Κάθε αντικείμενο User αντιστοιχεί σε μια γραμμή του πίνακα.
    }
}