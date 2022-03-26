namespace BeerCatalog.Application.Models;

public class ModelWithPagination<T> where T: class
{
    public int TotalCount { get; set; }
    public IEnumerable<T> Collection { get; set; }
}