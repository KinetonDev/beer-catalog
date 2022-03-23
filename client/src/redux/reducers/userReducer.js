import
{
    CHECK_EMAIL_FAILED,
    CHECK_EMAIL_REQUEST,
    CHECK_EMAIL_SUCCESS,
    CHECK_USERNAME_FAILED,
    CHECK_USERNAME_REQUEST,
    CHECK_USERNAME_SUCCESS,
    CLEAR_FLAGS,
    CONFIRM_EMAIL_FAILED,
    CONFIRM_EMAIL_REQUEST,
    CONFIRM_EMAIL_SUCCESS,
    LOGIN_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REFRESH_TOKEN_FAILED,
    REFRESH_TOKEN_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    START_VALIDATING
} from "../types/types";

const defaultFlagsValues = {
    flags: {
        confirmationSucceeded: false,
        wasConfirmationRequested: false,
        loginSucceeded: false,
        wasLoginRequested: false,
        userWithEmailExists: false,
        userWithUsernameExists: false,
    },
    loadingFlags: {
        isConfirmationProcessing: false,
        isCheckingProcessing: false
    }
}

const initialState = {
    isAuth: false,
    id: "",
    username: "",
    email: "",
    password: "",
    avatarUrl: "",
    accessToken: "",
    favoriteBeer: [],
    flags: {
        ...defaultFlagsValues.flags
    },
    loadingFlags: {
        ...defaultFlagsValues.loadingFlags
    },
    errors: {
        login: {
            message: ""
        }
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
                isAuth: true,
                accessToken: action.payload.response.access_token,
                flags: {...state.flags, loginSucceeded: true, wasLoginRequested: true}};
        case LOGIN_FAILED:
            return {...state,
                flags: {...state.flags, loginSucceeded: false, wasLoginRequested: true},
                errors: {...state.errors, login: action.payload.error}};
        case CHECK_EMAIL_REQUEST:
            return {...state, loadingFlags: {...state.loadingFlags, isCheckingProcessing: true}};
        case CHECK_EMAIL_SUCCESS:
            return {...state, flags: {...state.flags, userWithEmailExists: true}, loadingFlags: {...state.loadingFlags, isCheckingProcessing: false}};
        case CHECK_EMAIL_FAILED:
            return {...state, flags: {...state.flags, userWithEmailExists: false}, loadingFlags: {...state.loadingFlags, isCheckingProcessing: false}};
        case CHECK_USERNAME_REQUEST:
            return {...state, loadingFlags: {...state.loadingFlags, isCheckingProcessing: true}};
        case CHECK_USERNAME_SUCCESS:
            return {...state, flags: {...state.flags, userWithUsernameExists: true}, loadingFlags: {...state.loadingFlags, isCheckingProcessing: false}};
        case CHECK_USERNAME_FAILED:
            return {...state, flags: {...state.flags, userWithUsernameExists: false}, loadingFlags: {...state.loadingFlags, isCheckingProcessing: false}};
        case START_VALIDATING:
            return {...state, loadingFlags: {...state.loadingFlags, isCheckingProcessing: true}};
        case REFRESH_TOKEN_SUCCESS:
            return {...state, accessToken: action.payload.response.access_token, isAuth: true};
        case REFRESH_TOKEN_FAILED:
            return {...state, isAuth: false};
        default:
            return state;
    }
}