import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ComicsModel from '../../models/ComicsModel';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import classes from './ComicDescription.module.css';
import * as actions from '../../store/actions/index';

const ComicDescription = props => {
    const [comicID, setComicID] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [creators, setCreators] = useState([])
    
    
    useEffect(() => {
        ComicsModel.singleComic(props.match.params.id)
            .then(res => {
                setName(res.data.results[0].title)
                setImage(res.data.results[0].thumbnail.path)
                setDescription(res.data.results[0].description)
                setCreators(res.data.results[0].creators.items)
                setComicID(res.data.results[0].id)
            })
    }, [props.match.params.id])

    useEffect(() => {}, [props.token, props.userId, props.onSaveComic])

    const closeDescription = () => {
        props.history.goBack()
    }

    const saveComic = () => {
        const comic = {
            userId: props.userId,
            comicID,
            name: name,
            description: description,
            image: image,
            creators: creators
        }
        props.onSaveComic(comic, props.token)
    }

    const creatorsList = creators.map((creator, index) => (
        <p key={index}>{creator.name}</p>
    ))

    // let deleteButton
    // if (props.isAuthenticated && props.fromProfile) {
    //     deleteButton = (
    //         <button className={classes.deleteBtn} onClick={deleteComic}>
    //             <FontAwesomeIcon icon={faTrashAlt} className={'fa-fw'} />
    //         </button>
    //     )
    // }

    return (
        <div className={classes.ComicDescription}>
            <div className={classes.BtnContainer}>
                <button className={classes.favoriteBtn} onClick={saveComic}>
                    <FontAwesomeIcon icon={faStar} className={'fa-fw'} />
                </button>
                {/* {deleteButton} */}
                <button className={classes.closeBtn} onClick={closeDescription}>
                    <FontAwesomeIcon icon={faTimes} className={'fa-fw'} />
                </button>
            </div>
            <h1>{name}</h1>
            <p>{description}</p>
            <div className={classes.ImgContainer}>
                <img src={`${image}/portrait_uncanny.jpg`} alt='Poster'/>
            </div>
            <h3>Creators:</h3>
            <div className={classes.Creators}>{creatorsList}</div>
        </div>
    )
}

const mapStateToprops = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispathToProps = dispatch => {
    return {
        onSaveComic: (comicData, token) => dispatch(actions.saveComic(comicData, token))
    }
}

export default connect(mapStateToprops, mapDispathToProps)(ComicDescription);