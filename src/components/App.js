import React, { useEffect, useContext, } from 'react'
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ToastContainer, Flip } from 'react-toastify';
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";


import Header from '../components/Header'
import { Context as UserContext} from '../contexts/UserContext'

import Landing from '../pages/Landing'
import HousePointEntry from '../pages/HousePointEntry'
import AdminList from '../pages/AdminList'
import WhiteList from '../pages/WhiteList' 
import LoginError from '../pages/LoginError'
import MyStats from '../pages/MyStats'
import UserStats from '../pages/UserStats'

export const history = createBrowserHistory()

const App = () => {
    const { fetchUser } = useContext(UserContext)
    useEffect(() => {
        fetchUser()
      }, []);

    return(
        <div>
            <Router history={history}>
            <ToastContainer
                transition={Flip}
                position="top-center"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable={false}
                pauseOnHover
                />
                <Header />
                <div className='container'>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/houseentry" component={HousePointEntry} />
                    <Route exact path="/houseentry/:id" component={HousePointEntry} />
                    <Route exact path="/whitelist" component={WhiteList} />
                    <Route exact path ="/adminlist" component={AdminList} />
                    <Route exact path ="/loginerror" component={LoginError} />
                    
                    <Route exact path ="/user/:id" component={UserStats} />
                </div>
            </Router>
        </div>
    )
}
    
    


export default App