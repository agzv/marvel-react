import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import ComicsModel from '../../models/ComicsModel';
import classes from './CharacterDescription.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTimes } from '@fortawesome/free-solid-svg-icons'
import * as actions from '../../store/actions/index';

const CharacterDescription = props => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [relatedComics, setRelatedComics] = useState([])
    const [characterID, setCharacterID] = useState([])
    
    useEffect(() => {
        // console.log(props.match.params.id)
        ComicsModel.singleCharacter(props.match.params.id)
            .then(res => {
                setName(res.data.results[0].name)
                setDescription(res.data.results[0].description)
                setImage(res.data.results[0].thumbnail.path)
                setRelatedComics(res.data.results[0].comics.items)
                setCharacterID(res.data.results[0].id)
                console.log(res.data.results[0])
            })
    }, [props.match.params.id])

    useEffect(() => {}, [props.token, props.userId, props.onSaveCharacter])

    const saveCharacter = () => {
        const character = {
            userId: props.userId,
            characterID,
            name,
            description,
            image,
            relatedComics
        }

        props.onSaveCharacter(character, props.token)
        //UserModel.saveCharacter(character).then(data => console.log(data))
    }

    const closeDescription = () => {
        props.history.goBack()
    }

    // const deleteCharacter = () => {

    // }

    const relatedComicsList = relatedComics.map((relatedComic, index) => {
        return <p key={index}>{relatedComic.name}</p>
    })

    // let deleteButton
    // if (props.isAuthenticated && props.fromProfile) {
    //     deleteButton = (
    //         <button className={classes.deleteBtn} onClick={deleteCharacter}>
    //             <FontAwesomeIcon icon={faTrashAlt} className={'fa-fw'} />
    //         </button>
    //     )
    // }

    return (
        <div className={classes.CharacterDescription}>
            <div className={classes.BtnContainer}>
                <button className={classes.favoriteBtn} onClick={saveCharacter}>
                    <FontAwesomeIcon icon={faStar} className={'fa-fw'} />
                </button>
                <button className={classes.closeBtn} onClick={closeDescription}>
                    <FontAwesomeIcon icon={faTimes} className={'fa-fw'} />
                </button>
            </div>
            <h1>{name}</h1>
            <p>{description}</p>
            <div className={classes.ImgContainer}>
                <img src={`${image}/portrait_uncanny.jpg`} alt='Poster' />
            </div>
            <h3>{`Related Comics:`}</h3>
            <div className={classes.RelatedComics}>{relatedComicsList}</div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispathToProps = dispatch => {
    return {
        onSaveCharacter: (characterData, id) => dispatch(actions.saveCharacter(characterData, id))
    }
}

export default connect(mapStateToProps, mapDispathToProps)(CharacterDescription);