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