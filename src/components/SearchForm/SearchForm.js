import React from 'react';
import classes from './SearchForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchForm = props => {
    return (
        <form className={classes.SearchBox} onSubmit={(e) => props.handleSubmit(e)}>
            <input type='text'
                placeholder={props.placeholder}
                className={classes.SearchTxt}
                onChange={(e) => props.handleChange(e)}
                value={props.character} />
            <button type='submit' className={classes.SearchBtn}>
                <FontAwesomeIcon icon={faSearch} className={classes.Icon}/>
            </button>
        </form>
    )
}

export default SearchForm;

 // <form className={classes.SearchForm} onSubmit={(e) => props.handleSubmit(e)}>
 //     <input type='text'
 //         placeholder={props.placeholder}
 //         className={classes.TextInput}
 //         onChange={(e) => props.handleChange(e)}
 //         value={props.character} />
 //     <input type='submit' value='Search' className={classes.Btn} />
 // </form>