namespace BeerCatalog.Application.Models.Beer;

public class FavoriteBeerDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Tagline { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string ImageUrl { get; set; } = null!;
}