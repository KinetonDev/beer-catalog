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