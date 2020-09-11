import React, { useEffect } from 'react';
import classes from './Card.module.css';

const Card = props => {
    useEffect(() => {}, [props.name, props.image])

    return (
        <div className={classes.Card}>
            <div className={classes.ImageContainer}>
                <img src={props.img} alt='Hero Poster' />
            </div>
            <div className={classes.InfoContainer}>
                <h1>{props.name}</h1>
            </div>
        </div>
    )
}

export default Card;