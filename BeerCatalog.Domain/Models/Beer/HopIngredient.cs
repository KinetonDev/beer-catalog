using BeerCatalog.Domain.Models.Ingredients;

namespace BeerCatalog.Domain.Models.Beer
{
    public class HopIngredient
    {
        public Guid BeerId { get; set; }
        public Guid HopId { get; set; }
        public double Value { get; set; }
        public int WhenToAddId { get; set; }
        public int AttributeId { get; set; }

        public virtual HopAttribute Attribute { get; set; } = null!;
        public virtual Beer Beer { get; set; } = null!;
        public virtual Hop Hop { get; set; } = null!;
        public virtual WhenToAdd WhenToAdd { get; set; } = null!;
    }
}
