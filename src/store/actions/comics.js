import axios from 'axios';
import * as actionTypes from './actionTypes';

export const saveComicSuccess = (id, comicData) => {
    return {
        type: actionTypes.SAVE_COMICS_SUCCESS,
        comicId: id,
        comicData: comicData
    }
}

export const fetchComicsStart = () => {
    return {
        type: actionTypes.FETCH_COMICS_START
    }
}

export const fetchComicsSuccess = comics => {
    return {
        type: actionTypes.FETCH_COMICS_SUCCESS,
        comics: comics
    }
}

export const fetchComicsFailed = error => {
    return {
        type: actionTypes.FETCH_COMICS_FAILED,
        error: error
    }
}

export const fetchComics = (token, userId) => {
    return dispatch => {
        dispatch(fetchComicsStart())
        axios.get(`https://marvel-react-f1151.firebaseio.com/comics.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
            .then(response => {
            const comicsArr = Object.keys(response.data).map(comicKey => {
                return response.data[comicKey]
            })
            dispatch(fetchComicsSuccess(comicsArr))
        })
        .catch(error => {
            dispatch(fetchComicsFailed(error))
        })
    }
}

export const saveComic = (comicData, token) => {
    return dispatch => {
        axios.post(`https://marvel-react-f1151.firebaseio.com/comics.json?auth=${token}`, comicData)
            .then(response => {
                dispatch(saveComicSuccess(response.data.name, comicData))
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }
}