using System;
using System.Collections.Generic;

namespace BeerCatalog.Infrastructure
{
    public class Fermentation
    {
        public Guid Id { get; set; }
        public int Value { get; set; }
        public Guid BeerId { get; set; }

        public virtual Beer Beer { get; set; } = null!;
    }
}
