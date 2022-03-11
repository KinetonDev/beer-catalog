using BeerCatalog.Application.Common.Service;
using BeerCatalog.Application.Interfaces.Services;
using BeerCatalog.Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace BeerCatalog.Application.Services;

public class UserService : Service<User>, IUserService
{
    private readonly UserManager<User> _userManager;

    public UserService(UserManager<User> userManager)
    {
        _userManager = userManager;
    }
}