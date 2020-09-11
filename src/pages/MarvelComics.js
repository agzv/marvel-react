import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ComicsModel from '../models/ComicsModel';

import SearchForm from '../components/SearchForm/SearchForm';
import Card from '../components/Card/Card';

class MarvelComics extends Component {
    state = {
        comic: '',
        comicData: [],
        comicSearched: false
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
        this.setState({comic: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault()
        if (this.state.comic !== '') {
            this.setState({ comicSearched: true })
            ComicsModel.getComicByName(this.state.comic).then(data => {
                this.setState({ comicData: data.data.results })
                console.log(this.state.comicData)
            })
        }
    }
    

    render() {
        const comics = this.props.comics.map((comic, index)=> (
            <Link to={`/comics/${comic.id}`} key={index}>
                <Card name={comic.title} img={`${comic.thumbnail.path}/standard_fantastic.jpg`} />
            </Link>
        ))

        const searchedComic = this.state.comicData.map((data, index) => (
            <Link key={index} to={`/comics/${data.id}`}>
                <Card name={data.title} img={`${data.thumbnail.path}/standard_fantastic.jpg`} />
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
                    placeholder='Favorite comics'
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    value={this.state.comic}
                />
                <div style={styles}>
                    {this.state.comicSearched ? searchedComic : comics}
                </div>
            </div>
        )
    }
}

export default MarvelComics;