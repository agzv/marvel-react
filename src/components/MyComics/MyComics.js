import React from 'react';
import classes from './MyComics.module.css';

const MyComics = props => {
    return (
        <div className={classes.MyComics}>
            <h1 className={classes.MyComicsHeading}>My saved comics</h1>
            <div className={classes.ComicsContainer}>
                {props.comics}
            </div>
        </div>
    )
}

export default MyComics;