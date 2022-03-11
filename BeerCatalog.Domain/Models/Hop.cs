using BeerCatalog.Domain.Models.Enums;
using Attribute = BeerCatalog.Domain.Models.Enums.Attribute;

namespace BeerCatalog.Domain.Models;

public class Hop
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public double Value { get; set; }
    public Unit Unit { get; set; }
    public Add Add { get; set; }
    public Attribute Attribute { get; set; }
}