namespace BeerCatalog.Application.Common.Enums;

public enum ErrorCode
{
    UserNotFound = 1000,
    UserNotCreated,
    UserNotUpdated,
    UserNotDeleted,
    UserAlreadyExists,
    PasswordIsNotCorrect,
    RefreshTokenIsNotValid,
    EmailIsNotConfirmed,
    EmailConfirmationFailed,
    
    BeerNotFound = 2000,
    BeerIsAlreadyMarkedAsFavorite = 2001
}