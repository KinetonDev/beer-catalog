using BeerCatalog.Application.Common.Enums;
using BeerCatalog.Application.Interfaces.Services;

namespace BeerCatalog.Application.Common.Service;

public abstract class Service<T> : IService<T>
{
    public ServiceResult<T> Error(ErrorCode errorCode)
    {
        return new ServiceResult<T>(errorCode);
    }

    public ServiceResult<T> Result(T result)
    {
        return new ServiceResult<T>(result);
    }

    public ServiceResult<IEnumerable<T>> Result(IEnumerable<T> result)
    {
        return new ServiceResult<IEnumerable<T>>(result);
    }

    public ServiceResult Success()
    {
        return new ServiceResult();
    }
}