class UserModel {
    static saveCharacter = async (character) => {
        const URL = 'https://marvel-react-f1151.firebaseio.com/characters.json'
        return await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(character)
        }).then(res => res.json())
    }

    static saveComic = async (comic) => {
        const URL = `https://marvel-react-f1151.firebaseio.com/comics.json`
        return await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comic)
        }).then(res => res.json())
    }

    static getAllSavedComics = async () => {
        const URL = `https://marvel-react-f1151.firebaseio.com/comics.json`
        return await fetch(URL).then(res => res.json())
    }

    static getAllSavedCharacters = async () => {
        const URL = `https://marvel-react-f1151.firebaseio.com/characters.json`
        return await fetch(URL).then(res => res.json()).catch(err => console.log(err))
    }
}

export default UserModel;