namespace BeerCatalog.Domain.Models;

public class Method
{
    public Guid Id { get; set; }
    public List<Mash> Mash { get; set; } = new();
    public Fermentation Fermentation { get; set; }
    public string Twist { get; set; }
}