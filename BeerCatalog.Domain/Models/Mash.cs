using BeerCatalog.Domain.Models.Enums;

namespace BeerCatalog.Domain.Models;

public class Mash
{
    public Guid Id { get; set; }
    public double Value { get; set; }
    public Unit Unit { get; set; }
    public int Duration { get; set; }
}