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
    GET_ME_REQUEST,
    GET_ME_SUCCESS,
    GET_FAVORITES_FAILED,
    GET_FAVORITES_REQUEST,
    GET_FAVORITES_SUCCESS,
    LOGIN_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REFRESH_TOKEN_FAILED,
    REFRESH_TOKEN_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    START_VALIDATING, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED, CHANGE_AVATAR_SUCCESS, GET_ME_FAILED
} from "../types/types";
import createObjFromPatchDocJson from "../../helpers/createObjFromPatchDocJson";

const defaultFlagsValues = {
    flags: {
        confirmationSucceeded: false,
        wasConfirmationRequested: false,
        loginSucceeded: false,
        wasLoginRequested: false,
        userWithEmailExists: false,
        userWithUsernameExists: false,
        updateSucceeded: false,
        wasUpdateRequested: false
    },
    loadingFlags: {
        isConfirmationProcessing: false,
        isCheckingProcessing: false,
        isFavoritesLoading: true,
        isUpdating: false
    }
}

const initialState = {
    isAuth: false,
    userInfo: {
        id: "",
        role: "",
        username: "",
        email: "",
        avatar_url: "",
        country: "",
        birth_day: "1990-01-01",
        first_name: "",
        last_name: "",
        gender: ""
    },
    accessToken: "",
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
        case GET_ME_SUCCESS:
            return {...state, userInfo: {...state.userInfo, ...action.payload.response}};
        case GET_ME_FAILED:
            return {...state, isAuth: false};
        case UPDATE_USER_REQUEST:
            return {...state, loadingFlags: {...state.loadingFlags, isUpdating: true}};
        case UPDATE_USER_SUCCESS:
            return {...state,
                loadingFlags: {...state.loadingFlags, isUpdating: false},
                flags: {...state.flags, updateSucceeded: true, wasUpdateRequested: true},
                userInfo: patchUser(state.userInfo, action.payload.patchDocument)
            };
        case UPDATE_USER_FAILED:
            return {...state,
                loadingFlags: {...state.loadingFlags, isUpdating: false},
                flags: {...state.flags, updateSucceeded: false, wasUpdateRequested: true}};
        case CHANGE_AVATAR_SUCCESS:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    avatar_url: action.payload.response.url
                }
            };
        case GET_ME_REQUEST:
        default:
            return state;
    }
}

const patchUser = (userInfo, patchDoc) => {
    const newUserInfo = createObjFromPatchDocJson(patchDoc);

    const oldCopy = {
        ...userInfo
    };

    Object.entries(newUserInfo).forEach(([key, value]) => {
        const snakeKey = camelToSnakeCase(key);

        if(!!oldCopy[snakeKey]) {
            oldCopy[snakeKey] = value
        }
    });

    return oldCopy;
};

const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);