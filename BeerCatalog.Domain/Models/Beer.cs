namespace BeerCatalog.Domain.Models;

public class Beer
{
    public string? Name { get; set; }
    public string? Tagline { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public double Abv { get; set; }
    public double Ibu { get; set; }
    public double Ebc { get; set; }
    public List<string> FoodPairing { get; set; } = new();
    public Ingredients? Ingredients { get; set; }
    public Method? Method { get; set; }
}