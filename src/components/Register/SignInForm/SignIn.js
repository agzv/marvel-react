import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect} from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import Spinner from '../../Spinner/Spinner';

import classes from './SignIn.module.css';

const SignIn = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [focus, setFocus] = useState(false)

    let errorMessage
    if (props.error) {
        const updatedErrorMessage = props.error.split('').filter(el => el !== '_').join(' ')
        errorMessage = updatedErrorMessage
    }


    const signIn = e => {
        e.preventDefault()
        if (email !== '' && password !== '') {
            props.onAuth(email, password)
        }
        //AuthModel.signIn(user).then(data => console.log(data))
    }

    const onFocus = () => {
        setFocus(true)
    }

    const onBlur = event => {
        if (!event.target.value) {
            setFocus(false)
        }
    }

    let attachedClasses = [classes.TxtbSpan]
    if (focus) {
        attachedClasses = [classes.TxtbSpan, classes.FocusTxtbSpan, classes.FocusTxtbSpan2]
    }

    let spinner = null
    if (props.loading) {
        spinner = <Spinner />
    }

    let authRedirect = null
    if (props.isAuthenticated) {
        authRedirect = <Redirect to='/profile' />
    }

    return (
        <div className={classes.Container}>
            {authRedirect}
            {spinner}
            <form className={classes.LoginForm} onSubmit={signIn}>
                <h1>Login</h1>
                <div className={classes.Txtb}>
                    <input type="text" onFocus={onFocus} onBlur={onBlur} onChange={(e) => setEmail(e.target.value)}/>
                    <span data-placeholder='Email' className={attachedClasses.join(' ')}></span>
                </div>
                <div className={classes.Txtb}>
                    <input type="password" onFocus={onFocus} onBlur={onBlur} onChange={(e) => setPassword(e.target.value)}/>
                    <span data-placeholder='Password' className={attachedClasses.join(' ')}></span>
                </div>
                <input type="submit" value="Login" className={classes.Logbtn} />
                <div className={classes.BottomText}>
                    Don't have account? <Link to='/signup'>Sign Up</Link>
                </div>
            </form>
            <div className={classes.ErrorBox}>
                <p>{errorMessage}</p>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);


 
/* <form className={classes.SignInForm} onSubmit={signIn}>
    <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
    <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
    <input type='submit' value='Login' className={classes.Btn} />
</form>
<p>Don't have an account?</p>
<Link to='/signup'>Please Sign Up</Link> */
