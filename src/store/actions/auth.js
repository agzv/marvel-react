import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFailed = error => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationDate => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationDate * 1000)
    }
}

export const storeUserDetailsSuccess = (email, fullName) => {
    return {
        type: actionTypes.SAVE_USER_DETAILS_SUCCESS,
        email: email,
        fullName: fullName
    }
}

export const getUserDetails = (token, userId) => {
    return dispatch => {
        const URL = `https://marvel-react-f1151.firebaseio.com/users.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`
        axios.get(`${URL}`)
            .then(response => {
                const userDetailsArr = Object.keys(response.data).map(userKey => {
                    return response.data[userKey]
                })
                dispatch(storeUserDetailsSuccess(userDetailsArr[0].email, userDetailsArr[0].fullName))
            })
            .catch(error => console.log(error))
    }
}

export const storeUserDetails = (email, fullName, userId, token) => {
    const userData = {
        email,
        fullName,
        userId
    }
    
    const URL = `https://marvel-react-f1151.firebaseio.com/users.json`
    return dispatch => {
        axios.post(`${URL}?auth=${token}`, userData)
            .then(response => {
                console.log(userData)
                dispatch(storeUserDetailsSuccess(userData.email, userData.fullName))
            })
            .catch(error => console.log(error))
    }
    
}

export const auth = (email, password, fullName, isSignUp=false) => {
    return dispath => {
        dispath(authStart())

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJRNROs_8jEDYCDSOSCMsRXMkVaDsuB0o`

        if (isSignUp) {
            URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJRNROs_8jEDYCDSOSCMsRXMkVaDsuB0o`
        }

        axios.post(URL, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', response.data.localId)
                dispath(authSuccess(response.data.idToken, response.data.localId))
                if (isSignUp) {
                    dispath(storeUserDetails(email, fullName, response.data.localId, response.data.idToken))
                    
                }
                // if (!isSignUp) {
                //     dispath(getUserDetails(response.data.idToken, response.data.localId))
                // }
                dispath(getUserDetails(response.data.idToken, response.data.localId))
                dispath(checkAuthTimeout(response.data.expiresIn))
            }).catch(error => {
                if (!isSignUp) {
                    dispath(authFailed(error.response.data.error.message))
                }
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')

        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            const userId = localStorage.getItem('userId')

            if (expirationDate > new Date()) {
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            } else {
                dispatch(logout())
            }
        }
    }
}