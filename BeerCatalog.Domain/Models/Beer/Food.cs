namespace BeerCatalog.Domain.Models.Beer
{
    public class Food
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;

        public virtual ICollection<Beer> Beers { get; set; }  = new HashSet<Beer>();
    }
}
