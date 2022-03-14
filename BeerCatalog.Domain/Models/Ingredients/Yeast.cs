using System;
using System.Collections.Generic;

namespace BeerCatalog.Infrastructure
{
    public class Yeast
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;

        public virtual ICollection<Beer> Beers { get; set; } = new HashSet<Beer>();
    }
}
