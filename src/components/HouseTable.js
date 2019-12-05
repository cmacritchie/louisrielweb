import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Context as HouseContext } from '../contexts/HousePointsContext'
import { Context as UserContext } from '../contexts/UserContext'

const HouseTable = ({ housePoints }) => {

    console.log(housePoints)

    // const { state: { isAuthenticated, user, 
    //     loading } } = useContext(UserContext)

    // const { state: { loaded, entries },
    //  fetchPoints, deletePoints } = useContext(HouseContext)

    

        
    // const renderTable = (entryList) => {
    //     return entryList.map(entry => {
    //         return (
                
    //             <tr key={entry._id}>
    //                 <td>{entry.wolf}</td>
    //                 <td>{entry.eagle}</td>
    //                 <td>{entry.turtle}</td>
    //                 <td>{entry.bear}</td>
    //                 { isAuthenticated &&
    //                 <>
    //                     {
    //                         ( entry.owner === user._id || user.admin || user.apexAdmin ) ?
    //                         <>
    //                         <td><button onClick={()=>deletePoints(entry._id)}>delete</button></td>
    //                         <td>edit</td>
    //                         </>
    //                         :
    //                         <>
    //                         <td></td>
    //                         <td></td>
    //                         </>
    //                     }
    //                 </>
                        
    //                 }
                    
    //             </tr>
    //         )
    //     })
    // }

    return (
        <>
            <h1>Landing Page</h1>
            <h3>entries</h3>
            <table>
                    <thead>
                        <tr>
                            <th>Wolf</th>
                            <th>Eagle</th>
                            <th>Turtle</th>
                            <th>Bear</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{housePoints.wolf}</td>
                            <td>{housePoints.eagle}</td>
                            <td>{housePoints.turtle}</td>
                            <td>{housePoints.bear}</td>
                        </tr>
                    </tbody>
            </table>

        </>
    )
}

HouseTable.defaultProps  = {
    housePoints: {
        bear:0,
        wolf:0,
        eagle:0,
        turtle:0
    }
}

export default HouseTable
