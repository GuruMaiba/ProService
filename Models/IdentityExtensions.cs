using System.Data.Entity;
//using ProService.Migrations;

namespace ProService.Models
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Device> Devices { get; set; }
        public DbSet<Price> Price { get; set; }

        public ApplicationDbContext() : base("ServerDbConnection")
        {
            //Database.SetInitializer(new MigrateDatabaseToLatestVersion<ApplicationDbContext, Configuration>());
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}