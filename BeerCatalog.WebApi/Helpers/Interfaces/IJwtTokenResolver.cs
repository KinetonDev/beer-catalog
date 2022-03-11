namespace BeerCatalog.WebApi.Helpers.Interfaces;

public interface IJwtTokenResolver
{
    Guid GetUserIdFromToken(string token);
    bool ValidateRefreshToken(string token);
}