using BeerCatalog.Application.Common.Enums;
using BeerCatalog.Application.Common.Models;

namespace BeerCatalog.Application.Common.Service;

public class ServiceResult
{
    private bool _isSucceeded = true;
    private Error? _error;

    public ServiceResult()
    {
    }
    
    public ServiceResult(ErrorCode code)
    {
        Error = new Error(code);
    }

    public Error Error
    {
        get => _error;
        set
        {
            _error = value;
            _isSucceeded = false;
        }
    }

    public bool Succeeded => _isSucceeded;
}

public class ServiceResult<T> : ServiceResult
{
    public T? Result { get; }

    public ServiceResult(ErrorCode code) : base(code)
    {
    }
    
    public ServiceResult(T result)
    {
        Result = result;
    }
}