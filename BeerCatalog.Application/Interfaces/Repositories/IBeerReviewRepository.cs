using BeerCatalog.Domain.Models.Beer;

namespace BeerCatalog.Application.Interfaces.Repositories;

public interface IBeerReviewRepository : IRepository<BeerReview>
{
    Task<IEnumerable<BeerReview>> GetAllByBeerId(Guid beerId);
}