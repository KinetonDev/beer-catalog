using System.IdentityModel.Tokens.Jwt;
using BeerCatalog.WebApi.Common.Models;
using BeerCatalog.WebApi.Helpers.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace BeerCatalog.WebApi.Helpers;

public class JwtTokenResolver : IJwtTokenResolver
{
    private readonly JwtSettings _jwtSettings;

    public JwtTokenResolver(IOptions<JwtSettings> jwtSettings)
    {
        _jwtSettings = jwtSettings.Value;
    }
    
    public Guid GetUserIdFromToken(string tokenString)
    {
        var token = new JwtSecurityTokenHandler().ReadJwtToken(tokenString);
        var id = token.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub);
        return Guid.Parse(id?.Value ?? throw new Exception("There is no claim with Sub claim type"));
    }

    public bool ValidateRefreshToken(string token)
    {
        var isTokenValid = true;
        
        var tokenValidationParams = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = _jwtSettings.Issuer,
            ValidAudience = _jwtSettings.Audience,
            IssuerSigningKey = _jwtSettings.SigningKey,
            ClockSkew = TimeSpan.Zero
        };

        try
        {
            new JwtSecurityTokenHandler().ValidateToken(token, tokenValidationParams, out _);
            return isTokenValid;
        }
        catch (Exception e)
        {
            return isTokenValid = false;
        }
    }
}