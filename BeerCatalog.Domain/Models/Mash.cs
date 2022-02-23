using BeerCatalog.Domain.Models.Enums;

namespace BeerCatalog.Domain.Models;

public class Mash
{
    public double Value { get; set; }
    public Unit Unit { get; set; }
    public int Duration { get; set; }
}