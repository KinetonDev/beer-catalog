namespace BeerCatalog.Domain.Models;

public class Ingredients
{
    public Guid Id { get; set; }
    public List<Malt> Malts { get; set; } = new();
    public List<Hop> Hops { get; set; } = new();
    public string Yeast { get; set; }
}