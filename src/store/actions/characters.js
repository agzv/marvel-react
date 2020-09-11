import axios from 'axios';
import * as actionTypes from './actionTypes';

export const saveCharacterSuccess = (id, characterData) => {
    return {
        type: actionTypes.SAVE_CHARACTERS_SUCCESS,
        characterId: id,
        characterData: characterData
    }
}

export const fetchCharactersStart = () => {
    return {
        type: actionTypes.FETCH_CHARACTERS_START
    }
}

export const fetchCharactersSuccess = characters => {
    return {
        type: actionTypes.FETCH_CHARACTERS_SUCCESS,
        characters: characters
    }
}

export const fetchCharactersFailed = error => {
    return {
        type: actionTypes.FETCH_CHARACTERS_FAILED,
        error: error
    }
}

export const fetchCharacters = (token, userId) => {
    return dispatch => {
        dispatch(fetchCharactersStart())
        axios.get(`https://marvel-react-f1151.firebaseio.com/characters.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
            .then(response => {
                const charactersArr = Object.keys(response.data).map(characterKey => {
                    return response.data[characterKey]
                })
                dispatch(fetchCharactersSuccess(charactersArr))
            })
            .catch(error => {
                dispatch(fetchCharactersFailed(error))
            })
    }
}

export const saveCharacter = (characterData, token) => {
    return dispatch => {
        axios.post(`https://marvel-react-f1151.firebaseio.com/characters.json?auth=${token}`, characterData)
            .then(response => {
                dispatch(saveCharacterSuccess(response.data.name, characterData))
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }
}