using BeerCatalog.Domain.Models;
using BeerCatalog.Domain.Models.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BeerCatalog.Infrastructure.Data;

public class AppDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        Database.EnsureCreated();
    }

    public override DbSet<User> Users { get; set; }
    // public DbSet<Beer> Beers { get; set; }
    // public DbSet<Ingredients> Ingredients { get; set; }
    // public DbSet<Method> Methods { get; set; }
    // public DbSet<Malt> Malts { get; set; }
    // public DbSet<Hop> Hops { get; set; }
    // public DbSet<Mash> Mashes { get; set; }
    // public DbSet<Fermentation> Fermentations { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}