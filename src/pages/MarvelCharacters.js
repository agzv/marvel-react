import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ComicsModel from '../models/ComicsModel';

import SearchForm from '../components/SearchForm/SearchForm';
import Card from '../components/Card/Card';

class MarvelCharacters extends Component {
    state = {
        character: '',
        characterData: [],
        characterSearched: false
    }

    shouldComponentUpdate(prevProps, prevState) {
        if (prevProps !== this.props || prevState !== this.state) {
            return true
        } else {
            return false
        }
    }

    handleChange = e => {
        e.preventDefault()
        this.setState({ character: e.target.value })
        console.log(e.target.value)
    }

    handleSubmit = e => {
        e.preventDefault()
        if (this.state.character !== '') {
            this.setState({ characterSearched: true })
            ComicsModel.getCharacterByName(this.state.character).then(data => {
                console.log(data)
                this.setState({ characterData: data.data.results })
            })
        }
    }

    render() {
        const cards = this.props.characters.map((character, index) => (
                <Link key={index} to={`/characters/${character.id}`}>
                    <Card name={character.name} img={`${character.thumbnail.path}/standard_fantastic.jpg`} />
                </Link>
        ))

        const searchedCharacter = this.state.characterData.map((data, index) => (
            <Link key={index} to={`/characters/${data.id}`}>
                <Card name={data.name} img={`${data.thumbnail.path}/standard_fantastic.jpg`} />
            </Link>
        ))

        const styles = {
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center'
        }

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <SearchForm
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    character={this.state.character}
                    placeholder='Favorite characters'
                />
                <div style={styles}>
                    {this.state.characterSearched ? searchedCharacter : cards}
                </div>
            </div>
        )
    }
}

export default MarvelCharacters;