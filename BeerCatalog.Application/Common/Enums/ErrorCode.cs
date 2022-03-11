namespace BeerCatalog.Application.Common.Enums;

public enum ErrorCode
{
    UserNotFound = 1000,
    UserNotDeleted,
    UserNotCreated,
    UserNotUpdated,
    UserAlreadyExists,
    PasswordIsNotCorrect,
    RefreshTokenIsNotValid
}