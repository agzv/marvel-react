import React, { useState } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../Spinner/Spinner';
import { handleValidation } from '../../../utilities/utilities';

import classes from './SignUp.module.css';
import * as actions from '../../../store/actions/index';

const SignUp = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [focus, setFocus] = useState(false)
    const [emailError, setEmailError] = useState({ isError: null, message: null })
    const [passwordError, setPasswordError] = useState({ isError: null, message: null })
    const [nameError, setNameError] = useState({ isError: null, message: null })

    const signUp = e => {
        e.preventDefault()
        if (emailError.isError && passwordError.isError && nameError.isError) {
            props.onAuth(email, password, fullName, true)
            setEmail('')
            setPassword('')
            setFullName('')
        }
        // AuthModel.signUp(user).then(data => console.log(data))
        // AuthModel.saveUserData(user).then(data => console.log(data)
    }

    const onFocus = () => {
        setFocus(true)
    }

    const onBlur = (event) => {
        if (!event.target.value) {
            setFocus(false)
        }
    }

    let spinner = null
    if (props.loading) {
        spinner = <Spinner />
    }

    let attachedClasses = [classes.TxtbSpan]
    if (focus) {
        attachedClasses = [classes.TxtbSpan, classes.FocusTxtbSpan, classes.FocusTxtbSpan2]
    }

    return (
        <div className={classes.Container}>
            {spinner}
            <form className={classes.SignUpForm} onSubmit={signUp}>
                <h1>Sign Up</h1>
                <div className={classes.Txtb}>
                    <input type="text" onFocus={onFocus} onBlur={onBlur} onChange={(e) => {
                        setEmailError({
                            isError: handleValidation(e.target.value, 'email').formIsValid,
                            message: handleValidation(e.target.value, 'email').error
                        })
                        setEmail(e.target.value)
                    }}/>
                    <span data-placeholder='Email' className={attachedClasses.join(' ')}></span>
                </div>
                <div className={classes.Txtb}>
                    <input type="password" onFocus={onFocus} onBlur={onBlur} onChange={(e) => {
                        setPasswordError({
                            isError: handleValidation(e.target.value, 'password').formIsValid,
                            message: handleValidation(e.target.value, 'password').error
                        })
                        setPassword(e.target.value)
                    }}/>
                    <span data-placeholder='Password' className={attachedClasses.join(' ')}></span>
                </div>
                <div className={classes.Txtb}>
                    <input type="text" onFocus={onFocus} onBlur={onBlur} onChange={(e) => {
                        setNameError({
                            isError: handleValidation(e.target.value, 'fullName').formIsValid,
                            message: handleValidation(e.target.value, 'fullName').error
                        })
                        setFullName(e.target.value)
                    }}/>
                    <span data-placeholder='Full name' className={attachedClasses.join(' ')}></span>
                </div>
                {/* <div className={classes.Txtb}>
                    <input type="text" onFocus={onFocus} onBlur={onBlur} onChange={(e) => setPhone(e.target.value)}/>
                    <span data-placeholder='Phone number' className={attachedClasses.join(' ')}></span>
                </div>
                <div className={classes.Txtb}>
                    <input type="text" onFocus={onFocus} onBlur={onBlur} onChange={(e) => setCountry(e.target.value)}/>
                    <span data-placeholder='Country' className={attachedClasses.join(' ')}></span>
                </div> */}
                <input type="submit" value="Sign Up" className={classes.Logbtn} />
            </form>
            {<div className={classes.ErrorBox}>
                <p>{emailError.message}</p>
                <p>{passwordError.message}</p>
                <p>{nameError.message}</p>
            </div>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, fullName, isSignUp) => dispatch(actions.auth(email, password, fullName, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);




/* <form className={classes.SignUpForm} onSubmit={signUp} >
    <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
    <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
    <input type='text' placeholder='Full name' onChange={(e) => setFullName(e.target.value)} />
    <input type='text' placeholder='Phone number' onChange={(e) => setPhone(e.target.value)} />
    <input type='text' placeholder='Where are you from?' onChange={(e) => setCountry(e.target.value)} />
    <input type='submit' value={props.value} className={classes.Btn} />
</form> */
