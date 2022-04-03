using System.Security.Claims;

namespace BeerCatalog.WebApi.Helpers.Interfaces;

public interface IJwtTokenGenerator
{
    string GenerateAccessToken(List<Claim> claims);
    string GenerateRefreshToken(Guid userId);
}