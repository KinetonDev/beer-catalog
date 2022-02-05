import {apiUrl} from "../redux/api_url";

function createUrlFromFilter(endpoint, filter, page, perPage) {
    let root = apiUrl;
    const toAdd = [];
    if (filter.abv) {
        toAdd.push(`abv_gt=${filter.abv[0]}&abv_lt=${filter.abv[1]}`)
    }
    if (filter.ibu) {
        toAdd.push(`ibu_gt=${filter.ibu[0]}&ibu_lt=${filter.ibu[1]}`)
    }
    if (filter.ebc) {
        toAdd.push(`ebc_gt=${filter.ebc[0]}&ebc_lt=${filter.ebc[1]}`)
    }
    if (filter.searchQuery) {
        toAdd.push(`beer_name=${filter.searchQuery}`)
    }

    if (page && perPage) {
        toAdd.push(`page=${page}`);
        toAdd.push(`per_page=${perPage}`);
    }

    const urlParameters = toAdd.join('&');

    return root + "/" + endpoint + "?" + urlParameters;
}

export default createUrlFromFilter;