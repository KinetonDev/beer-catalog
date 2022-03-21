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
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        var registrationResult = await _authService.RegisterAsync(registerDto);

        if (registrationResult.Succeeded)
        {
            return Ok(registrationResult.Result);
        }

        return BadRequest(registrationResult.Error);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        var loginResult = await _authService.LoginAsync(loginDto);

        if (loginResult.Succeeded)
        {
            AddRefreshTokenToCookies(loginResult.Result!.RefreshToken);
            return Ok(new
            {
                loginResult.Result.AccessToken
            });
        }

        return BadRequest(loginResult.Error);
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh()
    {
        var refreshToken = Request.Cookies["refresh_token"];

        if (string.IsNullOrEmpty(refreshToken))
        {
            return BadRequest(new
            {
                Message = "No refresh token was provided"
            });
        }
        
        var refreshResult = await _authService.RefreshUserTokensAsync(new RefreshTokensDto
        {
            RefreshToken = refreshToken
        });

        if (refreshResult.Succeeded)    
        {
            AddRefreshTokenToCookies(refreshResult.Result!.RefreshToken);
            return Ok(new
            {
                refreshResult.Result.AccessToken
            });
        }

        return BadRequest(refreshResult.Error);
    }

    [HttpPost("confirm-email")]
    public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailDto confirmEmailDto)
    {
        var confirmEmailResult = await _authService.ConfirmEmailAsync(confirmEmailDto);

        if (confirmEmailResult.Succeeded)
        {
            return Ok();
        }

        return BadRequest(confirmEmailResult.Error);
    }

    private void AddRefreshTokenToCookies(string refreshToken)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = DateTimeOffset.Now.AddDays(14),
            Path = "/auth", 
            SameSite = SameSiteMode.None,
            Secure = true
        };
        
        Response.Cookies.Append("refresh_token", refreshToken, cookieOptions);
    } 
}