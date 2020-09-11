const publicKey = '01af76a3c2caff0cd8c8b7e6eb0eaaa1'
const hash = '1763bf4f4ad4ac5686dec90a36723274'

// const privateKey = `3291d7c6c54afe5a8768a20fc4c05ff5d806f544`
// '13291d7c6c54afe5a8768a20fc4c05ff5d806f54401af76a3c2caff0cd8c8b7e6eb0eaaa1'
// 'http://gateway.marvel.com/v1/public/comics?ts=1&apikey=01af76a3c2caff0cd8c8b7e6eb0eaaa1&hash=1763bf4f4ad4ac5686dec90a36723274'

const CHARACTERS_URL = `http://gateway.marvel.com/v1/public/characters?limit=100?ts=1&apikey=${publicKey}&hash=${hash}`;

const COMICS_URL = `http://gateway.marvel.com/v1/public/comics?ts=1&apikey=${publicKey}&hash=${hash}`;



class ComicsModel {
    static all = async () => {
        return await fetch(CHARACTERS_URL).then(res => res.json())
    }

    static allComics = async () => {
        return await fetch(COMICS_URL).then(res => res.json())
    }

    static singleCharacter = async (characterId) => {
        const singleCharacterURL = `http://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=${publicKey}&hash=${hash}`
        return await fetch(singleCharacterURL).then(res => res.json())
    }

    static getCharacterByName = async (characterName) => {
        const url = `https://gateway.marvel.com:443/v1/public/characters?name=${characterName}&apikey=${publicKey}`
        return await fetch(url).then(res => res.json())
    }

    static singleComic = async (characterId) => {
        const singleComicURL = `http://gateway.marvel.com/v1/public/comics/${characterId}?ts=1&apikey=${publicKey}&hash=${hash}`
        return await fetch(singleComicURL).then(res => res.json())
    }

    static getComicByName = async (comicName) => {
        const singleComicURL = `https://gateway.marvel.com:443/v1/public/comics?title=${comicName}&apikey=01af76a3c2caff0cd8c8b7e6eb0eaaa1`
        return await fetch(singleComicURL).then(res => res.json())
    }
}

export default ComicsModel;