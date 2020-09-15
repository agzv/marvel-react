export const handleValidation = (value, fieldName) => {
    let error;
    let formIsValid = true;

    //Name
    if (!value) {
        formIsValid = false;
        error = "Cannot be empty";
    }

    if (fieldName === 'fullName' && value !== "undefined") {
        if (!value.match(/^[a-zA-Z ]{2,30}$/)) {
            formIsValid = false;
            error = "Your name should be at least 2 symbols and 30 symbols max!";
        }
    }

    // Email
    if (fieldName === 'email' && value !== "undefined") {
        let lastAtPos = value.lastIndexOf('@');
        let lastDotPos = value.lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && value.indexOf('@@') === -1 && lastDotPos > 2 && (value.length - lastDotPos) > 2)) {
            formIsValid = false;
            error = "Email is not valid";
        }
    }

    // Password
    if (fieldName === 'password' && value !== 'undefined') {
        if (value.length < 6) {
            formIsValid = false
            error = 'Password should be at least 6 characters'
        }
    }

    return {formIsValid, error};
}