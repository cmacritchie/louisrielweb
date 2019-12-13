import React, { useEffect, useContext, } from 'react'
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ToastContainer } from 'react-toastify';
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";


import Header from '../components/Header'
import { Context as UserContext} from '../contexts/UserContext'

import Landing from '../pages/Landing'
import HousePointEntry from '../pages/HousePointEntry'
import AdminList from '../pages/AdminList'
import WhiteList from '../pages/WhiteList' 
import LoginError from '../pages/LoginError'
import UserStats from '../pages/UserStats'
import Support from '../pages/Support'

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
                position="bottom-center"
                autoClose={1500}
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
                    
                    <Route exact path="/whitelist" component={WhiteList} />
                    <Route exact path ="/adminlist" component={AdminList} />
                    <Route exact path ="/loginerror" component={LoginError} />
                    <Route exact path = "/support" component={Support} />
                    <Route exact path ="/user/:id" component={UserStats} />
                    <Switch>
                        <Route key="newEntry" exact path="/user/:id/houseentry" component={HousePointEntry} />
                        <Route key="existingEntry" path="/user/:id/houseentry/:entryid" component={HousePointEntry} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}
    
    


export default App