export function selectBeers(state) {
    return state.beer.beers;
}

export function selectFilter(state) {
    return state.beer.filter;
}

export function selectWasSearchPerformed(state) {
    return state.beer.wasSearchPerformed;
}

export function selectPage(state) {
    return state.beer.page;
}

export function selectPerPage(state) {
    return state.beer.perPage;
}

export function selectCurrentBeer(state) {
    return state.beer.currentBeer;
}

export function selectUserId(state) {
    return state.user.id;
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
    return state.user.favoriteBeer;
}

export function selectIsFavoritesLoading(state) {
    return state.user.loadingFlags.isFavoritesLoading;
}