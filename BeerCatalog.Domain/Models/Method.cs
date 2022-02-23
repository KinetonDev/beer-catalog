namespace BeerCatalog.Domain.Models;

public class Method
{
    public List<Mash> Mash { get; set; } = new();
    public Fermentation? Fermentation { get; set; }
    public string? Twist { get; set; }
}