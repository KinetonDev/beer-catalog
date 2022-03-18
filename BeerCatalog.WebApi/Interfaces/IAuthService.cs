using BeerCatalog.Application.Common;
using BeerCatalog.Application.Common.Service;
using BeerCatalog.Domain.Models;
using BeerCatalog.WebApi.Common.Models;
using BeerCatalog.WebApi.DTO;

namespace BeerCatalog.WebApi.Interfaces;

public interface IAuthService
{
    Task<ServiceResult<Guid>> RegisterAsync(RegisterDto registerDto);
    Task<ServiceResult<JwtTokens>> LoginAsync(LoginDto loginDto);
    Task<ServiceResult> ConfirmEmailAsync(ConfirmEmailDto confirmEmailDto);
    Task<ServiceResult<JwtTokens>> RefreshUserTokensAsync(RefreshTokensDto refreshTokensDto);
}