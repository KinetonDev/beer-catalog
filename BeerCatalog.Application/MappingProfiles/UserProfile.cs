using AutoMapper;
using BeerCatalog.Application.Models;
using BeerCatalog.Domain.Models;

namespace BeerCatalog.Application.MappingProfiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserReadDto>();
    }
}