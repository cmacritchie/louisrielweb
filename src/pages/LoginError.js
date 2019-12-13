import React from 'react'
import { Link } from 'react-router-dom'

const LoginError = props => {
    return (
        <div>
            <p>Your Email has not been whitelisted</p>
            <Link to={`/`}>
                <button className="btn blue accent-4">back</button>
            </Link> 
        </div>
    )
}

export default LoginError
