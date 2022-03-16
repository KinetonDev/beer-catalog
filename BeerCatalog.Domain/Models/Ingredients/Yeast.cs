namespace BeerCatalog.Domain.Models.Ingredients
{
    public class Yeast
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;

        public virtual ICollection<Beer.Beer> Beers { get; set; } = new HashSet<Beer.Beer>();
    }
}
