import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';

import classes from './Profile.module.css';
import Sidebar from '../components/Sidebar/Sidebar';
import Card from '../components/Card/Card';
import MyComics from '../components/MyComics/MyComics';
import MyCharacters from '../components/MyCharacters/MyCharaters';
import CharacterDescription from '../components/CharacterDescription/CharacterDescription';
import ComicDescription from '../components/ComicDescription/ComicDescription';

class Profile extends Component {
    state = {
        isOpen: false
    }

    componentDidMount() {
        this.fetchComics()
        this.fetchCharacters()
        // this.getUserDetails()
    }

    shouldComponentUpdate(prevProps, prevState) {
        if (this.props !== prevProps || this.state !== prevState) {
            return true
        } else {
            return false
        }
    }

    toggleSidebar = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    fetchComics = () => {
        this.props.onFetchComics(this.props.token, this.props.userId)
    }

    fetchCharacters = () => {
        this.props.onFetchCharacters(this.props.token, this.props.userId)
    }

    // getUserDetails = () => {
    //     this.props.onGetUserDetails(this.props.token, this.props.userId)
    // }

    // const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
    //     return (<li key={igKey}>
    //                 <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
    //             </li>);
    // })


    render() {
        const comics = this.props.comics.map((comic, index) => (
            <Link key={index} to={`/profile/mycomics/${comic.comicID}`}>
                <Card name={comic.name} img={`${comic.image}/standard_fantastic.jpg`} />
            </Link>
        ))

        const characters = this.props.characters.map((character, index) => (
            <Link key={index} to={`/profile/mycharacters/${character.characterID}`}>
                <Card name={character.name} img={`${character.image}/standard_fantastic.jpg`} />
            </Link>
        ))

        let greeting
        console.log(this.props.fullName)
        if (this.props.fullName !== null) {
            greeting = <h1>Hello, {this.props.fullName}</h1>
        }
        
        const profileContent = (
            <div className={classes.Banner}>
                {greeting}
                <p>This is your private page.</p>
                <p>All your saved comics and characters will appear in corresponding sections.</p>
            </div>
        )

        return (
            <div className={classes.Profile}>
                <Sidebar toggleSidebar={this.toggleSidebar} isOpen={this.state.isOpen} />
                
                <div className={classes.Content}>
                    <Switch>
                        <Route path='/profile' exact render={() => profileContent}/>
                        <Route path='/profile/mycomics' exact render={() => <MyComics comics={comics} />}/>
                        <Route path='/profile/mycomics/:id' render={(routeProps) => <ComicDescription {...routeProps} fromProfile={true} />}/>
                        <Route path='/profile/mycharacters' exact render={() => <MyCharacters characters={characters} />} />
                        <Route path='/profile/mycharacters/:id' render={(routeProps) => <CharacterDescription {...routeProps} fromProfile={true} />} />
                    </Switch>
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        comics: state.comics.comics,
        characters: state.characters.characters,
        fullName: state.auth.fullName
    }
}

const mapDispathToProps = dispatch => {
    return {
        onFetchComics: (token, userId) => dispatch(actions.fetchComics(token, userId)),
        onFetchCharacters: (token, userId) => dispatch(actions.fetchCharacters(token, userId)),
        // onGetUserDetails: (token, userId) => dispatch(actions.getUserDetails(token, userId))
    }
}

export default connect(mapStateToProps, mapDispathToProps)(Profile);