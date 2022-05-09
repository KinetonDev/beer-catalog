using BeerCatalog.Domain.Models;
using BeerCatalog.Domain.Models.Beer;
using BeerCatalog.Domain.Models.Ingredients;
using BeerCatalog.Domain.Models.Method;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BeerCatalog.Infrastructure.Data;

public class AppDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
{
    public AppDbContext()
    {
        
    }
    
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
    }

    public override DbSet<User> Users { get; set; } = null!;
    public virtual DbSet<Beer> Beers { get; set; } = null!;
    public virtual DbSet<Fermentation> Fermentations { get; set; } = null!;
    public virtual DbSet<Food> Foods { get; set; } = null!;
    public virtual DbSet<Hop> Hops { get; set; } = null!;
    public virtual DbSet<HopAttribute> HopAttributes { get; set; } = null!;
    public virtual DbSet<HopIngredient> HopIngredients { get; set; } = null!;
    public virtual DbSet<Malt> Malts { get; set; } = null!;
    public virtual DbSet<MaltIngredient> MaltIngredients { get; set; } = null!;
    public virtual DbSet<MashTemp> MashTemps { get; set; } = null!;
    public virtual DbSet<Twist> Twists { get; set; } = null!;
    public virtual DbSet<WhenToAdd> WhenToAdds { get; set; } = null!;
    public virtual DbSet<Yeast> Yeasts { get; set; } = null!;
    public virtual DbSet<BeerReview> Reviews => Set<BeerReview>(nameof(BeerReview));

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer("Server=localhost; Database=BeerCatalog; User Id = sa; Password = Heccrbqabpbr1; TrustServerCertificate = True;");
        }
        
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Beer>(entity =>
        {
            entity.ToTable("Beers", "Beer");
    
            entity.HasIndex(e => e.Name, "UQ__Beers__737584F60E343CBB")
                .IsUnique();
    
            entity.Property(e => e.Id).ValueGeneratedNever();
    
            entity.Property(e => e.BrewersTips).HasMaxLength(200);
    
            entity.Property(e => e.Description).HasMaxLength(500);
    
            entity.Property(e => e.ImageUrl).HasMaxLength(500);
    
            entity.Property(e => e.Name).HasMaxLength(30);
    
            entity.Property(e => e.Tagline).HasMaxLength(30);
    
            entity.HasOne(d => d.Yeast)
                .WithMany(p => p.Beers)
                .HasForeignKey(d => d.YeastId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Beers__YeastId__31EC6D26");
    
            entity.HasMany(d => d.Foods)
                .WithMany(p => p.Beers)
                .UsingEntity<Dictionary<string, object>>(
                    "FoodPairing",
                    l => l.HasOne<Food>().WithMany().HasForeignKey("FoodId")
                        .OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK__FoodPairi__FoodI__4E88ABD4"),
                    r => r.HasOne<Beer>().WithMany().HasForeignKey("BeerId")
                        .OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK__FoodPairi__BeerI__4D94879B"),
                    j =>
                    {
                        j.HasKey("BeerId", "FoodId").HasName("PK__FoodPair__816A4F81415D6025");
    
                        j.ToTable("FoodPairing", "Beer");
                    });
            
            entity.HasMany(d => d.Fans)
                .WithMany(p => p.Favorites)
                .UsingEntity<Dictionary<string, object>>(
                    "FavoriteBeer",
                    r => r.HasOne<User>().WithMany().HasForeignKey("UserId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK__FavoriteB__UserI__625A9A57"),
                    l => l.HasOne<Beer>().WithMany().HasForeignKey("BeerId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK__FavoriteB__BeerI__634EBE90"),
                    j =>
                    {
                        j.HasKey("UserId", "BeerId").HasName("PK__Favorite__F51B050768A08B47");

                        j.ToTable("FavoriteBeers");
                    });
            
            entity.HasMany(d => d.Reviewers)
                .WithMany(p => p.ReviewedBeers)
                .UsingEntity<BeerReview>(
                    nameof(BeerReview),
                    j =>
                    {
                        j.HasKey(a => a.Id).HasName("PK_REVIEWS_ID");
                        
                        j.ToTable("Reviews", "Beer");
                    });
        });

        modelBuilder.Entity<Fermentation>(entity =>
        {
            entity.ToTable("Fermentation", "Method");
    
            entity.Property(e => e.Id).ValueGeneratedNever();
    
            entity.Property(e => e.Value).HasColumnName("VALUE");
        });
    
        modelBuilder.Entity<Food>(entity =>
        {
            entity.ToTable("Food", "Beer");
    
            entity.Property(e => e.Id).ValueGeneratedNever();
    
            entity.Property(e => e.Name).HasMaxLength(100);
        });
    
        modelBuilder.Entity<Hop>(entity =>
        {
            entity.ToTable("Hops", "Ingredients");
    
            entity.Property(e => e.Id).ValueGeneratedNever();
    
            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .HasColumnName("NAME");
        });
    
        modelBuilder.Entity<HopAttribute>(entity =>
        {
            entity.ToTable("HopAttribute", "Ingredients");
    
            entity.Property(e => e.Value)
                .HasMaxLength(30)
                .HasColumnName("HopAttribute");
        });
    
        modelBuilder.Entity<HopIngredient>(entity =>
        {
            entity.ToTable("HopIngredients", "Beer");
    
            entity.HasOne(d => d.Attribute)
                .WithMany(p => p.HopIngredients)
                .HasForeignKey(d => d.HopAttributeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__HopIngred__Attri__38996AB5");
    
            entity.HasOne(d => d.Beer)
                .WithMany(p => p.HopIngredients)
                .HasForeignKey(d => d.BeerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__HopIngred__BeerI__35BCFE0A");
    
            entity.HasOne(d => d.Hop)
                .WithMany(p => p.HopIngredients)
                .HasForeignKey(d => d.HopId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__HopIngred__HopId__36B12243");
    
            entity.HasOne(d => d.WhenToAdd)
                .WithMany(p => p.HopIngredients)
                .HasForeignKey(d => d.WhenToAddId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__HopIngred__WhenT__37A5467C");
        });
    
        modelBuilder.Entity<Malt>(entity =>
        {
            entity.ToTable("Malts", "Ingredients");
    
            entity.Property(e => e.Id).ValueGeneratedNever();
    
            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .HasColumnName("NAME");
        });
    
        modelBuilder.Entity<MaltIngredient>(entity =>
        {
            entity.ToTable("MaltIngredients", "Beer");
    
            entity.HasOne(d => d.Beer)
                .WithMany(p => p.MaltIngredients)
                .HasForeignKey(d => d.BeerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MaltIngre__BeerI__3C69FB99");
    
            entity.HasOne(d => d.Malt)
                .WithMany(p => p.MaltIngredients)
                .HasForeignKey(d => d.MaltId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MaltIngre__MaltI__3D5E1FD2");
        });
    
        modelBuilder.Entity<MashTemp>(entity =>
        {
            entity.ToTable("MashTemp", "Method");
    
            entity.Property(e => e.Id).ValueGeneratedNever();
    
            entity.HasOne(d => d.Beer)
                .WithMany(p => p.MashTemps)
                .HasForeignKey(d => d.BeerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MashTemp__BeerId__4222D4EF");
        });
    
        modelBuilder.Entity<Twist>(entity =>
        {
            entity.ToTable("Twists", "Method");
    
            entity.Property(e => e.Id).ValueGeneratedNever();
    
            entity.Property(e => e.Name).HasMaxLength(200);
        });
    
        modelBuilder.Entity<WhenToAdd>(entity =>
        {
            entity.ToTable("WhenToAdd", "Ingredients");
    
            entity.Property(e => e.Value)
                .HasMaxLength(30)
                .HasColumnName("WhenToAdd");
        });
    
        modelBuilder.Entity<Yeast>(entity =>
        {
            entity.ToTable("Yeasts", "Ingredients");
    
            entity.Property(e => e.Id).ValueGeneratedNever();
    
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("NAME");
        });
            
        base.OnModelCreating(modelBuilder);
    }
}