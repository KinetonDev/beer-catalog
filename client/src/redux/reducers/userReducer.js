import
{
    CLEAR_FLAGS,
    CONFIRM_EMAIL_FAILED,
    CONFIRM_EMAIL_REQUEST,
    CONFIRM_EMAIL_SUCCESS, LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_REQUEST,
    REGISTER_SUCCESS
} from "../types/types";

const defaultFlagsValues = {
    flags: {
        confirmationSucceeded: false,
        wasConfirmationRequested: false,
        loginSucceeded: false,
        wasLoginRequested: false
    },
    loadingFlags: {
        isConfirmationProcessing: false
    }
}

const initialState = {
    id: "",
    username: "",
    email: "",
    password: "",
    avatarUrl: "",
    accessToken: "",
    refreshToken: "",
    favoriteBeer: [],
    flags: {
        ...defaultFlagsValues.flags
    },
    loadingFlags: {
        ...defaultFlagsValues.loadingFlags
    }
}

export const userReducer = (state = initialState, action) => {
    console.log(action.type);
    console.log(action.payload);

    switch (action.type) {
        case CLEAR_FLAGS:
            return {...state,
            flags: {...defaultFlagsValues.flags},
            loadingFlags: {...defaultFlagsValues.loadingFlags}};
        case REGISTER_REQUEST:
            return state;
        case REGISTER_SUCCESS:
            return {...state, id: action.payload.response};
        case CONFIRM_EMAIL_REQUEST:
            return {...state, loadingFlags: {...state.loadingFlags, isConfirmationProcessing: true}};
        case CONFIRM_EMAIL_SUCCESS:
            return {...state,
                flags: {...state.flags, confirmationSucceeded: true, wasConfirmationRequested: true},
                loadingFlags: {...state.loadingFlags, isConfirmationProcessing: false}};
        case CONFIRM_EMAIL_FAILED:
            return {...state,
                flags: {...state.flags, confirmationSucceeded: false, wasConfirmationRequested: true},
                loadingFlags: {...state.loadingFlags, isConfirmationProcessing: false}};
        case LOGIN_REQUEST:
            return state;
        case LOGIN_SUCCESS:
            return {...state,
                accessToken: action.payload.response.access_token,
                refreshToken: action.payload.response.refresh_token,
                flags: {...state.flags, loginSucceeded: true, wasLoginRequested: true}};
        case LOGIN_FAILED:
            return {...state,
                flags: {...state.flags, loginSucceeded: false, wasLoginRequested: true}};
        default:
            return state;
    }
}