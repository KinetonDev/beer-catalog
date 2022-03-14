using AutoMapper;
using BeerCatalog.Domain.Models;
using BeerCatalog.WebApi.DTO;

namespace BeerCatalog.WebApi.MapperProfiles;

public class AuthProfile : Profile
{
    public AuthProfile()
    {
        CreateMap<RegisterDto, User>();
        CreateMap<LoginDto, User>();
    }
}