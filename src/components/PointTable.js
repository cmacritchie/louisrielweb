import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { Context as HouseContext } from '../contexts/HousePointsContext'
import moment from 'moment'

const PointTable = ({ stats }) => {

    const { deletePoints } = useContext(HouseContext)


    return( <div>
        {/* <div>
            <p>user: {userStats.name}</p>
        </div>
        { userStats.housePoints.length > 0 ?
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Eagle</th>
                        <th>Bear</th>
                        <th>Wolf</th>
                        <th>Turtle</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    userStats.housePoints.map(entry => {
                        return (
                            <tr key={entry._id}>
                                <td>{moment(entry.updatedAt).format('YYYY MM DD')}</td>
                                <td>{entry.eagle}</td>
                                <td>{entry.bear}</td>
                                <td>{entry.wolf}</td>
                                <td>{entry.turtle}</td>
                                <td><NavLink to={`/houseentry/${entry._id}`}>Edit</NavLink></td>
                                <td><button onClick={()=>deletePoints(entry._id)}>Delete</button></td>
                            </tr>
                        )
                    }) 
                    }
                </tbody>
            </table>
            :
            <p>No Entries Yet!</p>
        } */}
        </div>
    )
}

export default PointTable
