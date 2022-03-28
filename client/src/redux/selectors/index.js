export function selectBeers(state) {
    return state.beer.beers;
}

export function selectWasSearchPerformed(state) {
    return state.beer.wasSearchPerformed;
}

export function selectPage(state) {
    return state.beer.page;
}

export function selectTotalBeerPages(state) {
    return state.beer.totalPages;
}

export function selectTotalFavoritePages(state) {
    return state.favorites.totalPages;
}

export function selectTotalFavoritesCount(state) {
    return state.favorites.totalCount;
}

export function selectCurrentBeer(state) {
    return state.beer.currentBeer;
}

export function selectUserId(state) {
    return state.user.userInfo.id;
}

export function selectUserInfo(state) {
    const user = state.user.userInfo;
    console.log(user)

    return {
        username: user.username,
        email: user.email,
        avatarUrl: user.avatar_url,
        birthDay: user.birth_day,
        country: user.country,
        firstName: user.first_name,
        lastName: user.last_name,
        gender: user.gender
    }
}

export function selectUpdatingFlags(state) {
    return {
        isUpdating: state.user.loadingFlags.isUpdating,
        updateSucceeded: state.user.flags.updateSucceeded,
        wasUpdateRequested: state.user.flags.wasUpdateRequested
    }
}

export function selectConfirmationSucceeded(state) {
    return state.user.flags.confirmationSucceeded;
}

export function selectIsConfirmationProcessing(state) {
    return state.user.loadingFlags.isConfirmationProcessing;
}

export function selectWasConfirmationRequested(state) {
    return state.user.flags.wasConfirmationRequested;
}

export function selectLoginSucceeded(state) {
    return state.user.flags.loginSucceeded;
}

export function selectWasLoginRequested(state) {
    return state.user.flags.wasLoginRequested;
}

export function selectLoginError(state) {
    return state.user.errors.login;
}

export function selectUserWithEmailExists(state) {
    return state.user.flags.userWithEmailExists;
}

export function selectUserWithUsernameExists(state) {
    return state.user.flags.userWithUsernameExists;
}

export function selectAccessToken(state) {
    return state.user.accessToken;
}

export function selectIsAuth(state) {
    return state.user.isAuth;
}

export function selectIsCheckingProcessing(state) {
    return state.user.loadingFlags.isCheckingProcessing;
}

export function selectFavoriteBeer(state) {
    return state.favorites.favorites;
}

export function selectIsFavoritesLoading(state) {
    return state.favorites.loadingFlags.isFavoritesLoading;
}