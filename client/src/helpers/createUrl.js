import {apiUrl} from "../redux/api_url";

function createUrl(endpoint) {
    return apiUrl + "/" + endpoint;
}

export default createUrl;