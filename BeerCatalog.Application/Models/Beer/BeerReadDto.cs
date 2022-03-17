using BeerCatalog.Domain.Models.Ingredients;

namespace BeerCatalog.Application.Models.Beer;

public class BeerReadDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Tagline { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string ImageUrl { get; set; } = null!;
    public double Abv { get; set; }
    public double Ibu { get; set; }
    public double Ebc { get; set; }
    public Method Method { get; set; }
    public Ingredients Ingredients { get; set; }
    public virtual ICollection<string> FoodPairing { get; set; } = new List<string>();
    public string BrewersTips { get; set; } = null!;
}