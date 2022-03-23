using BeerCatalog.Domain.Models.Ingredients;

namespace BeerCatalog.Domain.Models.Beer
{
    public class MaltIngredient
    {
        public Guid Id { get; set; }
        public Guid BeerId { get; set; }
        public Guid MaltId { get; set; }
        public double Value { get; set; }

        public virtual Beer Beer { get; set; } = null!;
        public virtual Malt Malt { get; set; } = null!;
    }
}
