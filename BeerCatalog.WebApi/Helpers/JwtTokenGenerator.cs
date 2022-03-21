using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BeerCatalog.WebApi.Common.Models;
using BeerCatalog.WebApi.Helpers.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace BeerCatalog.WebApi.Helpers;

public class JwtTokenGenerator : IJwtTokenGenerator
{
    private readonly JwtSettings _jwtSettings;

    public JwtTokenGenerator(IOptions<JwtSettings> jwtSettings)
    {
        _jwtSettings = jwtSettings.Value;
    }
    
    public string GenerateAccessToken(List<Claim> claims)
    {
        var token = new JwtSecurityToken(
            _jwtSettings.Issuer,
            _jwtSettings.Audience,
            claims,
            DateTime.Now,
            DateTime.Now.AddMinutes(15),
            new SigningCredentials(_jwtSettings.SigningKey, SecurityAlgorithms.HmacSha256)
        );

        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

        return tokenString;
    }

    public string GenerateRefreshToken(List<Claim> claims)
    {
        var refreshToken = new JwtSecurityToken(
            _jwtSettings.Issuer,
            _jwtSettings.Audience,
            claims,
            DateTime.Now,
            DateTime.Now.AddDays(1),
            new SigningCredentials(_jwtSettings.SigningKey, SecurityAlgorithms.HmacSha256)
        );

        var tokenString = new JwtSecurityTokenHandler().WriteToken(refreshToken);

        return tokenString;
    }
}