using BeerCatalog.Application.Common;
using BeerCatalog.Application.Common.Enums;
using BeerCatalog.Application.Common.Service;

namespace BeerCatalog.Application.Interfaces.Services;

public interface IService<T>
{
    ServiceResult<T> Error(ErrorCode errorCode);
    ServiceResult<T> Result(T result);

    ServiceResult Success();
}