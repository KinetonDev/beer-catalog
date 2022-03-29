using Newtonsoft.Json.Converters;

namespace BeerCatalog.Application.Common.Attributes;

public class OnlyDateConverter : IsoDateTimeConverter
{
    public OnlyDateConverter()
    {
        DateTimeFormat = "yyyy-MM-dd";
    }
}