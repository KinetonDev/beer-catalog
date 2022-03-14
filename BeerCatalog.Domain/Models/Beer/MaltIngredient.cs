using System;
using System.Collections.Generic;

namespace BeerCatalog.Infrastructure
{
    public class MaltIngredient
    {
        public Guid BeerId { get; set; }
        public Guid MaltId { get; set; }
        public double Value { get; set; }

        public virtual Beer Beer { get; set; } = null!;
        public virtual Malt Malt { get; set; } = null!;
    }
}
