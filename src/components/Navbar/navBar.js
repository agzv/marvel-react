import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = props => {

    let attachedClasses = [classes.Navbar, classes.Close]
    if (props.isOpen) {
        attachedClasses = [classes.Navbar, classes.Open]
    }

    let navLinks = [
        <NavLink to='/' exact key='1'>Marvel</NavLink>,
        <NavLink to='/comics' key='2'>Comics</NavLink>,
        <NavLink to='/characters' key='3'>Characters</NavLink>,
        props.isAuthenticated ? <NavLink to='/profile' key='4'>Profile</NavLink> : null,
        !props.isAuthenticated ? <NavLink to='/signin' key='5'>Login / Sign Up </NavLink> : <NavLink to='/logout' key='6'>Logout</NavLink>
    ]

    return (
        <nav className={attachedClasses.join(' ')}>
            <div className={classes.NavHeader}>
                <button className={classes.ToggleBtn} onClick={props.toggle}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>
            <ul className={classes.NavigationItems}>
                {/* <li className={classes.NavigationItem}><NavLink to='/' exact>Home</NavLink></li>
                <li className={classes.NavigationItem}><NavLink to='/comics'>Marvel Comics</NavLink></li>
                <li className={classes.NavigationItem}><NavLink to='/characters'>Marvel Characters</NavLink></li>
                <li className = {classes.NavigationItem}>{props.isAuthenticated ? <NavLink to='/profile'>Profile</NavLink> : null}</li>
                <li className = {classes.NavigationItem}>{!props.isAuthenticated ? <NavLink to='/signin'>Login / Sign Up </NavLink> : <NavLink to='/logout'>Logout</NavLink>}</li> */}
                {navLinks.map(navL => navL)}
            </ul>
        </nav>
    )
}

export default Navbar;

