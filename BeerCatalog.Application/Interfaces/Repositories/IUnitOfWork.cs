using BeerCatalog.Application.Interfaces.Repositories;

namespace BeerCatalog.Infrastructure;

public interface IUnitOfWork
{
    IRepository<Beer> BeersRepository { get; }
    Task SaveChangesAsync();
}