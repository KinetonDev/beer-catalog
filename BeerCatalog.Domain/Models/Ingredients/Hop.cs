using System;
using System.Collections.Generic;

namespace BeerCatalog.Infrastructure
{
    public class Hop
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;

        public virtual ICollection<HopIngredient> HopIngredients { get; set; }  = new HashSet<HopIngredient>();
    }
}
