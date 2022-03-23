using BeerCatalog.Domain.Models;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace BeerCatalog.WebApi.IdentityTokenProviders;

public class EmailSixDigitConfirmationTokenProvider : IUserTwoFactorTokenProvider<User>
{
    private readonly int _tokenSize = 6;
    
    public async Task<string> GenerateAsync(string purpose, UserManager<User> manager, User user)
    {
        if (purpose != UserManager<User>.ConfirmEmailTokenPurpose)
        {
            throw new ArgumentException("Invalid type of token was provided. Required: email confirmation token");
        }

        var possibleNumbers = new[]{'0','1','2','3','4','5','6','7','8','9'};

        var random = new Random();

        var token = new string(
            Enumerable.Repeat(possibleNumbers, _tokenSize)
                .Select(e => e[random.Next(e.Length)])
            .ToArray()
            );

        user.EmailConfirmationCode = token;
        await manager.UpdateAsync(user);
        return token;
    }

    public async Task<bool> ValidateAsync(string purpose, string token, UserManager<User> manager, User user)
    {
        if (purpose != UserManager<User>.ConfirmEmailTokenPurpose)
        {
            throw new ArgumentException("Invalid type of token was provided. Required: email confirmation token");
        }

        if (token != user.EmailConfirmationCode) return false;

        user.EmailConfirmationCode = null;
        user.EmailConfirmed = true;
        user.LockoutEnabled = false;

        await manager.UpdateAsync(user);

        return true;
    }

    public Task<bool> CanGenerateTwoFactorTokenAsync(UserManager<User> manager, User user)
    {
        return Task.FromResult(false);
    }
}