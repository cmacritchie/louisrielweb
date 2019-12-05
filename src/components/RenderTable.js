import React from 'react'

const RenderTable = ({children, profile}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Email</th>
                    {profile && 
                        <th>Profile</th>
                    }
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                { children }  
            </tbody>
        </table>
    )
}

RenderTable.defaultProps  = {
    profile: false
}

export default RenderTable
