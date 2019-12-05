import React, { useContext} from 'react'
import { Context as UserContext } from '../contexts/UserContext'

const SignedIn = ({ loggedIn, adminPrivilege, apexAdminPrivilege, children }) => {

    const { state: { user, isAuthenticated }} = useContext(UserContext)
    
    if(!user) {
        return null;
    }  

    if(loggedIn && isAuthenticated){
        return <>{children}</>
    }

    const { admin, apexAdmin } = user

    if(adminPrivilege && admin){
        return <>{children}</>
    }

    if(apexAdminPrivilege && apexAdmin){
        return <>{children}</>
    }
        
    return null 
}

SignedIn.defaultProps = {
    loggedIn:false,
    admin:false,
    apexAdmin:false
  };

export default SignedIn
