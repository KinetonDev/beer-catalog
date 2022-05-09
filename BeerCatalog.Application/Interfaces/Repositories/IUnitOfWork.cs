using BeerCatalog.Domain.Models.Beer;

namespace BeerCatalog.Application.Interfaces.Repositories;

public interface IUnitOfWork
{
    IBeerRepository BeersRepository { get; }
    IUserRepository UsersRepository { get; }
    IBeerReviewRepository BeerReviewRepository { get; }
    Task SaveChangesAsync();
}