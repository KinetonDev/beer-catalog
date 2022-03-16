using BeerCatalog.Application.Interfaces.Repositories;

namespace BeerCatalog.Infrastructure;

public interface IUnitOfWork
{
    public IRepository<Beer> BeersRepository { get; }
}