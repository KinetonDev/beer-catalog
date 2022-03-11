using AutoMapper;
using BeerCatalog.Domain.Models;
using BeerCatalog.WebApi.DTO;

namespace BeerCatalog.WebApi.MapperProfiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<RegisterDto, User>();
        CreateMap<LoginDto, User>();
    }
}