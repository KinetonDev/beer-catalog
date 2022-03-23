using BeerCatalog.Domain.Models.Ingredients;

namespace BeerCatalog.Application.Models.Beer;

public class Ingredients
{
    public IEnumerable<HopReadDto> Hops { get; set; } = new List<HopReadDto>();
    public IEnumerable<MaltReadDto> Malt { get; set; } = new List<MaltReadDto>();
    public string? Yeast { get; set; }
}