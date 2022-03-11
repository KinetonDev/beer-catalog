using BeerCatalog.Domain.Models.Enums;

namespace BeerCatalog.Domain.Models;

public class Malt
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public double Value { get; set; }
    public Unit Unit { get; set; }
}