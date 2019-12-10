import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { withRouter, NavLink, Link } from 'react-router-dom'
import { Context as UserContext } from '../contexts/UserContext';
import { Navbar, Dropdown, Divider, NavItem } from "react-materialize";
import SignedIn from './SignedIn'


const Header =({ history })=> {
    const {state:{isAuthenticated, user, loaded },
            logOut        
            } = useContext(UserContext)

    return(
        <Navbar className="red lighten-1" brand={<NavLink to="/">Louis Riel <i className="material-icons right">home</i></NavLink>}  alignLinks="right">
            { !isAuthenticated && <a href="/auth/google">Login With Google</a> }
            { (isAuthenticated && user.apexAdmin) && <NavLink className="sidenav-close" to='/adminlist'>Admin List</NavLink>}
            { (isAuthenticated && (user.admin || user.apexAdmin)) && <NavLink className="sidenav-close" to='/whitelist'>User List</NavLink> }
            { isAuthenticated && <NavLink className="sidenav-close" to={`/user/${user._id}/houseentry`}>House Entry</NavLink> }
            { isAuthenticated && <NavLink className="sidenav-close" to={`/user/${user._id}`}>My Stats</NavLink> }
            { isAuthenticated && <NavLink className="sidenav-close" to='/support'>Support</NavLink> }
            { isAuthenticated && <NavItem className="sidenav-close" onClick={logOut}>Logout</NavItem> }
        </Navbar>
    )
}

export default withRouter(Header)