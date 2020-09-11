import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    comics: []
}

const comicsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_COMICS:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SAVE_COMICS_SUCCESS:
            const newComic = {
                ...action.comicData,
                id: action.comicId
            }
            return {
                ...state,
                loading: false,
                comics: state.comics.concat(newComic)
            }
        case actionTypes.FETCH_COMICS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_COMICS_SUCCESS:
            return {
                ...state,
                loading: false,
                comics: action.comics
            }
        case actionTypes.FETCH_COMICS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return {
                ...state
            }
    }
}

export default comicsReducer;