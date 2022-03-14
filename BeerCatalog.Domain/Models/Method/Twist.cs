using System;
using System.Collections.Generic;

namespace BeerCatalog.Infrastructure
{
    public class Twist
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public Guid BeerId { get; set; }

        public virtual Beer Beer { get; set; } = null!;
    }
}
