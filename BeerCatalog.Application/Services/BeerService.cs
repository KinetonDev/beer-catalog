using System.Linq.Expressions;
using AutoMapper;
using BeerCatalog.Application.Common.Enums;
using BeerCatalog.Application.Common.Service;
using BeerCatalog.Application.Interfaces.Repositories;
using BeerCatalog.Application.Interfaces.Services;
using BeerCatalog.Application.Models.Beer;
using BeerCatalog.Domain.Models.Beer;

namespace BeerCatalog.Application.Services;

public class BeerService : Service<BeerReadDto>, IBeerService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public BeerService(
        IUnitOfWork unitOfWork,
        IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }
    
    public async Task<ServiceResult<BeerReadDto>> GetByIdAsync(Guid id)
    {
        var beer = _mapper.Map<BeerReadDto>(await _unitOfWork.BeersRepository.FindByIdAsync(id));

        if (beer != null) return Result(beer);

        return Error(ErrorCode.BeerNotFound);
    }

    public async Task<ServiceResult<IEnumerable<BeerReadDto>>> GetAllAsync()
    {
        var beers = (await _unitOfWork.BeersRepository.AllAsync());
        
        var mappedBeers = _mapper.Map<IEnumerable<BeerReadDto>>(beers);
        
        return Result(mappedBeers);
    }

    public Task<ServiceResult> DeleteByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResult> UpdateByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }
}