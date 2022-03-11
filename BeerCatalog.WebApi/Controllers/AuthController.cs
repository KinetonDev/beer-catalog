using BeerCatalog.WebApi.Common.Models;
using BeerCatalog.WebApi.DTO;
using BeerCatalog.WebApi.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BeerCatalog.WebApi.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto registerDto)
    {
        var registrationResult = await _authService.RegisterAsync(registerDto);

        if (registrationResult.Succeeded)
        {
            return Ok();
        }

        return BadRequest(registrationResult.Error);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
        var loginResult = await _authService.LoginAsync(loginDto);

        if (loginResult.Succeeded)
        {
            return Ok(loginResult.Result);
        }

        return BadRequest(loginResult.Error);
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh(RefreshTokensDto refreshTokensDto)
    {
        var refreshResult = await _authService.RefreshUserTokens(refreshTokensDto);

        if (refreshResult.Succeeded)
        {
            return Ok(refreshResult.Result);
        }

        return BadRequest(refreshResult.Error);
    }

    [HttpPost("confirmEmail")]
    public async Task<IActionResult> ConfirmEmail(ConfirmEmailDto confirmEmailDto)
    {
        var confirmEmailResult = await _authService.ConfirmEmailAsync(confirmEmailDto);

        if (confirmEmailResult.Succeeded)
        {
            return Ok();
        }

        return BadRequest(confirmEmailResult.Error);
    }
}