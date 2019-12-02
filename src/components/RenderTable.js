import React from 'react'

const RenderTable = ({children}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Profile</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                { children }  
            </tbody>
        </table>
    )
}

export default RenderTable
