using BeerCatalog.Domain.Models.Enums;

namespace BeerCatalog.Domain.Models;

public class Malt
{
    public string? Name { get; set; }
    public double Value { get; set; }
    public Unit Unit { get; set; }
}