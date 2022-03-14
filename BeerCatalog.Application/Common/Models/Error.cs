using BeerCatalog.Application.Common.Enums;

namespace BeerCatalog.Application.Common.Models;

public class Error
{
    public ErrorCode ErrorCode { get; }
    public string Message { get; set; }

    public Error(ErrorCode code)
    {
        ErrorCode = code;
        Message = GetMessageFromErrorCode(code);
    }

    private static string GetMessageFromErrorCode(ErrorCode code) => code switch
    {
        ErrorCode.UserAlreadyExists => "User already exists",
        ErrorCode.UserNotCreated => "User wasn't created",
        ErrorCode.UserNotFound => "User wasn't found",
        ErrorCode.UserNotUpdated => "User wasn't updated",
        ErrorCode.PasswordIsNotCorrect => "Specified password is not correct",
        ErrorCode.RefreshTokenIsNotValid => "Refresh token isn't valid",
        ErrorCode.EmailIsNotConfirmed => "User didn't confirm email address",
        ErrorCode.EmailConfirmationFailed => "Email confirmation failed",
        ErrorCode.UserNotDeleted => "User wasn't deleted",
        _ => throw new Exception("Unknown error code")
    };
}