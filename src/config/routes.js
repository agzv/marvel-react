import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import MarvelCharacters from '../pages/MarvelCharacters';
import MarvelComics from '../pages/MarvelComics';
import CharacterDescription from '../components/CharacterDescription/CharacterDescription';
import ComicDescription from '../components/ComicDescription/ComicDescription';
import SignUp from '../components/Register/SignUpForm/SignUp';
import SignIn from '../components/Register/SignInForm/SignIn';
import Profile from '../pages/Profile';
import Logout from '../pages/Logout';

export const DefaultRoutes = props => (
    <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/comics' exact render={() => (<MarvelComics comics={props.comics} />)} />
        <Route path='/comics/:id' render={(routeProps) => (<ComicDescription {...routeProps} />)} />
        <Route path='/characters' exact render={(routeProps) => (<MarvelCharacters {...routeProps} characters={props.characters} />)} />
        <Route path='/characters/:id' render={(routeProps) => (<CharacterDescription {...routeProps} />)}/>
        <Route path='/signin' component={SignIn}/>
        <Route path='/signup' render={() => <SignUp value='Sign Up' />}/>
        {/* <Route path='/profile' component={Profile} /> */}
        <Redirect to='/' />
    </Switch>
)

export const AuthRoutes = props => (
    <Switch>
        <Route path='/comics' exact render={() => (<MarvelComics comics={props.comics} />)} />
        <Route path='/comics/:id' render={(routeProps) => (<ComicDescription {...routeProps} />)} />
        <Route path='/characters' exact render={(routeProps) => (<MarvelCharacters {...routeProps} characters={props.characters} />)} />
        <Route path='/characters/:id' render={(routeProps) => (<CharacterDescription {...routeProps} />)}/>
        <Route path='/profile' component={Profile} />
        <Route path='/logout' component={Logout} />
        <Route path='/' exact component={HomePage} />
        <Redirect to='/profile' />
    </Switch>
)

