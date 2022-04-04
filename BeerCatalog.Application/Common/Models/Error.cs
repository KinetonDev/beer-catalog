using BeerCatalog.Application.Common.Enums;

namespace BeerCatalog.Application.Common.Models;

public class Error
{
    public ErrorCode ErrorCode { get; }
    public string Message { get; }

    public Error(ErrorCode code)
    {
        ErrorCode = code;
        Message = GetMessageFromErrorCode(code);
    }

    private static string GetMessageFromErrorCode(ErrorCode code) => code switch
    {
        //users
        ErrorCode.UserAlreadyExists => "User already exists",
        ErrorCode.UserNotCreated => "User wasn't created",
        ErrorCode.UserNotFound => "User wasn't found",
        ErrorCode.UserNotUpdated => "User wasn't updated",
        ErrorCode.PasswordIsNotCorrect => "Specified password is not correct",
        ErrorCode.RefreshTokenIsNotValid => "Refresh token isn't valid",
        ErrorCode.EmailIsNotConfirmed => "User didn't confirm email address",
        ErrorCode.EmailConfirmationFailed => "Email confirmation failed",
        ErrorCode.UserNotDeleted => "User wasn't deleted",
        ErrorCode.NotAllowedToUpdateAccount => "You're not allowed to update this user",
        ErrorCode.NotAllowedToDeleteAccount => "You're not allowed to delete this user",
        //beers
        ErrorCode.BeerNotFound => "Beer wasn't found",
        ErrorCode.BeerIsAlreadyMarkedAsFavorite => "Beer is already favorite",
        ErrorCode.BeerIsNotMarkedAsFavorite => "Beer is not favorite",
        ErrorCode.BeerAlreadyExists => "Beer already exists",
        ErrorCode.BeerNotCreated => "Beer was not created",
        //common
        ErrorCode.ValidationFailed => "Validation failed",
        ErrorCode.InvalidBase64 => "Invalid base 64 was provided",
        _ => throw new ArgumentException("Unknown error code")
    };
}