import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Context as UserContext } from '../contexts/UserContext'

export default (adminAuth = false, apexAuth = false) => ChildComponent => {
    class ComposedComponent extends Component {

        componentDidMount(){

        }
        

        render() {
            let { state: { user, isAuthenticated, loading }} = this.context;
            if(loading) {
                return null
            }
            if(isAuthenticated){
                if(apexAuth && user.apexAdmin){
                    return <ChildComponent {...this.props} />
                }

                if(adminAuth && (user.admin || user.apexAdmin)){
                    return <ChildComponent {...this.props} />
                }

                if(!adminAuth && !apexAuth) {
                    return <ChildComponent {...this.props} />
                }
            }

            return (
                <>
                    <p>Error 401: Unauthorized</p>
                    {isAuthenticated &&
                    <>
                        <NavLink to={`/user/${user._id}`}>My Stats</NavLink>
                        <br />
                        </>
                    }
                    <NavLink to='/'>Home</NavLink>
                </>
            )
            
        }
    }
    ComposedComponent.contextType = UserContext;

    return ComposedComponent
}