import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { withRouter, NavLink } from 'react-router-dom'
import { Context as UserContext } from '../contexts/UserContext';


const Header =({ history })=> {
    const {state:{isAuthenticated, user },
            logOut        
            } = useContext(UserContext)

    return(
        <nav style={{backgroundColor:'pink'}}>
            <br/>
                <p><a href="/auth/google">Login With Google</a></p>
                <NavLink to='/'>to Landing Page</NavLink>
            <br/>
            {isAuthenticated ?
                <> 
                <p><NavLink to='/houseentry'>To House Entry</NavLink></p>
                <p>{user.name} <button onClick={logOut}>Logout</button></p>
                {(user.admin || user.apexAdmin) && <p><NavLink to='/whitelist'>edit WhiteList</NavLink></p>}
                <p><NavLink to={`/user/${user._id}`}>my stats</NavLink></p>
                {user.apexAdmin && <p><NavLink to='/adminlist'>adminlist</NavLink></p>}
                </>
                : 'welcome guest'}
            
        </nav>
    )
}

export default withRouter(Header)