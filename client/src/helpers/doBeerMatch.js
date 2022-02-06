function doBeerMatch(beer, filter) {
    return beer.abv === filter.abv &&
        beer.ibu === filter.ibu &&
        beer.ebc === filter.ebc;
}

export default doBeerMatch;