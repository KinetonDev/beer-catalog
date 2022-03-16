using BeerCatalog.Domain.Models.Beer;

namespace BeerCatalog.Domain.Models.Ingredients
{
    public class Malt
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;

        public virtual ICollection<MaltIngredient> MaltIngredients { get; set; } = new HashSet<MaltIngredient>();
    }
}
