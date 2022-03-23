namespace BeerCatalog.Domain.Models.Method
{
    public class Twist
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public Guid BeerId { get; set; }

        public virtual Beer.Beer Beer { get; set; } = null!;
    }
}
