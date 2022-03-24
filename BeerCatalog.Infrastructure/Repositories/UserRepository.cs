﻿using BeerCatalog.Application.Interfaces.Repositories;
using BeerCatalog.Domain.Models;
using BeerCatalog.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BeerCatalog.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _dbContext;

    public UserRepository(DbContext dbContext)
    {
        _dbContext = dbContext as AppDbContext
                     ?? throw new ArgumentException("Invalid type of dbContext was provided");
    }
    
    public async Task<User?> GetWithFavoritesByIdAsync(Guid id)
    {
        return await _dbContext.Users
            .Include(u => u.Favorites)
            .FirstOrDefaultAsync(u => u.Id == id);
    }
}