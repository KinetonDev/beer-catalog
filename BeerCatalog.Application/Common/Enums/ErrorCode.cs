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
    NotAllowedToDeleteAccount,
    NotAllowedToUpdateAccount,

    BeerNotFound = 2000,
    BeerIsAlreadyMarkedAsFavorite,
    BeerIsNotMarkedAsFavorite,
    BeerAlreadyExists,
    BeerNotCreated,
    
    ReviewNotFound = 3000,
    NotAllowedToDeleteReview,
    
    InvalidBase64 = 10000,
    ValidationFailed,
}