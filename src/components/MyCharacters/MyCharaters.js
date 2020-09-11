import React from 'react';

import classes from './MyCharacters.module.css';

const MyCharacters = props => {
    return (
        <div className={classes.MyCharacters}>
            <h1 className={classes.MyCharactersHeading}>My saved characters</h1>
            <div className={classes.CharactersContainer}>
                {props.characters}
            </div>
        </div>
    )
}

export default MyCharacters;