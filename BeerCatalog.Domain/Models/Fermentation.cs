using BeerCatalog.Domain.Models.Enums;

namespace BeerCatalog.Domain.Models;

public class Fermentation
{
    public double Value { get; set; }
    public Unit Unit { get; set; }
}