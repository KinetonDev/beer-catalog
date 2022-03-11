using System.Security.Claims;
using AutoMapper;
using BeerCatalog.Application.Common;
using BeerCatalog.Application.Common.Enums;
using BeerCatalog.Application.Common.Service;
using BeerCatalog.Domain.Models;
using BeerCatalog.WebApi.Common.Models;
using BeerCatalog.WebApi.DTO;
using BeerCatalog.WebApi.Helpers.Interfaces;
using BeerCatalog.WebApi.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.JsonWebTokens;

namespace BeerCatalog.WebApi.Services;

public class AuthService : Service<JwtTokens>, IAuthService
{
    private readonly UserManager<User> _userManager;
    private readonly IMapper _mapper;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IJwtTokenResolver _jwtTokenResolver;
    private readonly IEmailChannel _emailChannel;

    public AuthService(
        UserManager<User> userManager,
        IMapper mapper,
        IJwtTokenGenerator jwtTokenGenerator,
        IJwtTokenResolver jwtTokenResolver,
        IEmailChannel emailChannel)
    {
        _userManager = userManager;
        _mapper = mapper;
        _jwtTokenGenerator = jwtTokenGenerator;
        _jwtTokenResolver = jwtTokenResolver;
        _emailChannel = emailChannel;
    }
    
    public async Task<ServiceResult> RegisterAsync(RegisterDto registerDto)
    {
        var existingUser = await _userManager.FindByEmailAsync(registerDto.Email)
                           ?? await _userManager.FindByNameAsync(registerDto.Username);

        if (existingUser != null)
            return Error(ErrorCode.UserAlreadyExists);

        var user = _mapper.Map<User>(registerDto);

        var creatingResult = await _userManager.CreateAsync(user, registerDto.Password);

        if (!creatingResult.Succeeded)
            return Error(ErrorCode.UserNotCreated);

        var emailConfirmationCode = await _userManager.GenerateEmailConfirmationTokenAsync(user);

        await _emailChannel.PushEmailMessageAsync(new EmailMessage
        {
            Subject = "Email confirmation",
            To = registerDto.Email,
            Body = $"Please confirm your email. Your code: {emailConfirmationCode}"
        });

        return Success();
    }

    public async Task<ServiceResult<JwtTokens>> LoginAsync(LoginDto loginDto)
    {
        var existingUser = await _userManager.FindByEmailAsync(loginDto.Email);

        if (existingUser == null)
            return Error(ErrorCode.UserNotFound);

        var isPasswordValid = await _userManager.CheckPasswordAsync(existingUser, loginDto.Password);

        if (!isPasswordValid)
        {
            return Error(ErrorCode.PasswordIsNotCorrect);
        }

        var isEmailConfirmed = await _userManager.IsEmailConfirmedAsync(existingUser);

        if (!isEmailConfirmed)
        {
            return Error(ErrorCode.EmailIsNotConfirmed);
        }

        var claims = new List<Claim>
        {
            new (JwtRegisteredClaimNames.Sub, existingUser.Id.ToString())
        };

        var refreshToken = _jwtTokenGenerator.GenerateRefreshToken(claims);
        existingUser.RefreshToken = refreshToken;
        var updatingResult = await _userManager.UpdateAsync(existingUser);

        if (!updatingResult.Succeeded)
        {
            return Error(ErrorCode.UserNotUpdated);
        }
        
        return Result(new JwtTokens
        {
            AccessToken = _jwtTokenGenerator.GenerateAccessToken(claims),
            RefreshToken = refreshToken
        });
    }

    public async Task<ServiceResult> ConfirmEmailAsync(ConfirmEmailDto confirmEmailDto)
    {
        var user = await _userManager.FindByIdAsync(confirmEmailDto.UserId.ToString());

        if (user == null)
        {
            return Error(ErrorCode.UserNotFound);
        }

        var confirmationResult = await _userManager.ConfirmEmailAsync(user, confirmEmailDto.Code);

        if (!confirmationResult.Succeeded)
        {
            return Error(ErrorCode.EmailConfirmationFailed);
        }

        return Success();
    }

    public async Task<ServiceResult<JwtTokens>> RefreshUserTokensAsync(RefreshTokensDto refreshTokensDto)
    {
        var userId = _jwtTokenResolver.GetUserIdFromToken(refreshTokensDto.RefreshToken);
        var existingUser = await _userManager.FindByIdAsync(userId.ToString());

        if (existingUser == null)
            return Error(ErrorCode.UserNotFound);

        var isRefreshTokenValid = _jwtTokenResolver.ValidateRefreshToken(refreshTokensDto.RefreshToken);

        if (!isRefreshTokenValid || existingUser.RefreshToken != refreshTokensDto.RefreshToken)
        {
            return Error(ErrorCode.RefreshTokenIsNotValid);
        }
        
        var claims = new List<Claim>
        {
            new (JwtRegisteredClaimNames.Sub, existingUser.Id.ToString())
        };

        var newAccessToken = _jwtTokenGenerator.GenerateAccessToken(claims);
        var newRefreshToken = _jwtTokenGenerator.GenerateAccessToken(claims);
        existingUser.RefreshToken = newRefreshToken;
        var updatingResult = await _userManager.UpdateAsync(existingUser);
        
        if (!updatingResult.Succeeded)
        {
            return Error(ErrorCode.UserNotUpdated);
        }
        
        return Result(new JwtTokens
        {
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken
        });
    }
}