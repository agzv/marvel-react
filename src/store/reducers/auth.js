import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    email: null,
    fullName: null,
    error: null,
    loading: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                error: null,
                loading: false
            }
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                email: null,
                fullName: null,
                phoneNumber: null,
                country: null
            }
        case actionTypes.SAVE_USER_DETAILS_SUCCESS:
            return {
                ...state,
                email: action.userDetails[0].email,
                fullName: action.userDetails[0].fullName,
            }
        default:
            return state
    }
}

export default authReducer;