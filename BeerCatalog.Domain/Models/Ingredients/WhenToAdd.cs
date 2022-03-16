using BeerCatalog.Domain.Models.Beer;

namespace BeerCatalog.Domain.Models.Ingredients
{
    public class WhenToAdd
    {
        public int Id { get; set; }
        public string Value { get; set; } = null!;

        public virtual ICollection<HopIngredient> HopIngredients { get; set; } = new HashSet<HopIngredient>();
    }
}
