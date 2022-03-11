namespace BeerCatalog.Application.Common.Enums;

public enum ErrorCode
{
    UserNotFound = 1000,
    UserNotCreated,
    UserNotUpdated,
    UserAlreadyExists,
    PasswordIsNotCorrect,
    RefreshTokenIsNotValid,
    EmailIsNotConfirmed,
    EmailConfirmationFailed
}