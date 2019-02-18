using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace AbelardoAPI.Models
{
    public class CustomContext : DbContext
    {
        public CustomContext(DbContextOptions<CustomContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}
