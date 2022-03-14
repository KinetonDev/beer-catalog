using System;
using System.Collections.Generic;

namespace BeerCatalog.Infrastructure
{
    public class HopAttribute
    {
        public int Id { get; set; }
        public string Value { get; set; } = null!;

        public virtual ICollection<HopIngredient> HopIngredients { get; set; }  = new HashSet<HopIngredient>();
    }
}
