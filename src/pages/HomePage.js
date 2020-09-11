import React, { Component } from 'react';
import classes from './HomePage.module.css';

class HomePage extends Component {
    render() {
        return (
            <div className={classes.HomePage}>
                <h1>Welcome!</h1>
                <p>Here you can find all your favorite comics and characters</p>
                <p>Enjoy !!!</p>
            </div>
        )
    }
}

export default HomePage;