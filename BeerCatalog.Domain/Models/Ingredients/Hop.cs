using BeerCatalog.Domain.Models.Beer;

namespace BeerCatalog.Domain.Models.Ingredients
{
    public class Hop
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;

        public virtual ICollection<HopIngredient> HopIngredients { get; set; }  = new HashSet<HopIngredient>();
    }
}
