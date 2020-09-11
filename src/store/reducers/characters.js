import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    characters: []
}

const charactersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_CHARACTERS:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SAVE_CHARACTERS_SUCCESS:
            const newCharacter = {
                ...action.characterData,
                id: action.characterId
            }
            return {
                ...state,
                characters: state.characters.concat(newCharacter)
            }
        case actionTypes.FETCH_CHARACTERS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_CHARACTERS_SUCCESS:
            return {
                ...state,
                loading: false,
                characters: action.characters
            }
        case actionTypes.FETCH_CHARACTERS_FAILED:
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

export default charactersReducer;