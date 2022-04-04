using AutoMapper;
using BeerCatalog.Application.Models;
using BeerCatalog.Domain.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.JsonPatch.Operations;

namespace BeerCatalog.Application.MappingProfiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserReadDto>();
        CreateMap<UserUpdateDto, User>();
        CreateMap<User, UserUpdateDto>();
        CreateMap<User, UserWithRoleReadDto>();
    }
}