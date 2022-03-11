using BeerCatalog.Domain.Models.Enums;

namespace BeerCatalog.Domain.Models;

public class Fermentation
{
    public Guid Id { get; set; }
    public double Value { get; set; }
    public Unit Unit { get; set; }
}