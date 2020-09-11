class AuthModel {
    static signUp = async (userData) => {
        const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJRNROs_8jEDYCDSOSCMsRXMkVaDsuB0o`

        const authData = {
            email: userData.email,
            password: userData.password,
            returnSecureToken: true
        }

        return await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(authData)
        }).then(res => res.json())
    }

    static signIn = async (userData) => {
        const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJRNROs_8jEDYCDSOSCMsRXMkVaDsuB0o`

        const authData = {
            email: userData.email,
            password: userData.password,
            returnSecureToken: true
        }

        return await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(authData)
        }).then(res => res.json())
    }

    static saveUserData = async (data) => {
        const URL = `https://marvel-react-f1151.firebaseio.com/userData.json`
        
        const userData = {
            email: data.email,
            name: data.fullName,
            phone: data.phone,
            country: data.country
        }
        
        return await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        }).then(res => res.json())
    }
}

export default AuthModel;