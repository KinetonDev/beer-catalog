using BeerCatalog.Domain.Models.Ingredients;
using BeerCatalog.Domain.Models.Method;

namespace BeerCatalog.Domain.Models.Beer
{
    public class Beer
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Tagline { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string ImageUrl { get; set; } = null!;
        public double Abv { get; set; }
        public double Ibu { get; set; }
        public double Ebc { get; set; }
        public string BrewersTips { get; set; } = null!;
        public Guid YeastId { get; set; }

        public virtual Yeast Yeast { get; set; } = null!;
        public virtual Fermentation Fermentation { get; set; }
        public virtual ICollection<HopIngredient> HopIngredients { get; set; }  = new HashSet<HopIngredient>();
        public virtual ICollection<MaltIngredient> MaltIngredients { get; set; }  = new HashSet<MaltIngredient>();
        public virtual ICollection<MashTemp> MashTemps { get; set; } = new HashSet<MashTemp>();
        public virtual Twist? Twist { get; set; }
        public virtual ICollection<Food> Foods { get; set; } = new HashSet<Food>();

        public virtual ICollection<User> Fans { get; set; } = new HashSet<User>();
    }
}
