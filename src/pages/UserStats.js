import React, { useContext, useEffect, useState} from 'react'
import { Context as HouseContext } from '../contexts/HousePointsContext'
import moment from 'moment'
import requireAuth from '../components/requireAuth'
import { NavLink } from 'react-router-dom';

const UserStats = ({ match }) => {
    
    const { params: { id } } = match 
    const userId = id

    const {state:{ entries, entryLoaded },
    fetchUserPoints, deletePoints } = useContext(HouseContext)

            useEffect(() => {
                if(userId && !entries[userId]){
                        fetchUserPoints(userId)
                    }
            }, [])
            
            if(entryLoaded && entries[userId]) {
                const userProfile = entries[userId]
                return( <div>
                            <div>
                                <p>User: {userProfile.name}</p>
                            </div>
                        { userProfile.housePoints.length > 0 ?
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Bear</th>
                                        <th>Wolf</th>
                                        <th>Eagle</th>
                                        <th>Turtle</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    userProfile.housePoints.map(entry => {
                                        return (
                                            <tr key={entry._id}>
                                                <td>{moment(entry.updatedAt).format('YYYY MM DD')}</td>
                                                <td>{entry.bear}</td>
                                                <td>{entry.wolf}</td>
                                                <td>{entry.eagle}</td>
                                                <td>{entry.turtle}</td>
                                                <td><NavLink className='btn amber' to={`/user/${userProfile._id}/houseentry/${entry._id}`}><i className="material-icons">edit</i></NavLink></td>
                                                <td><button className='btn red darken-1' onClick={()=>deletePoints(entry._id)}><i className="material-icons">delete_forever</i></button></td>
                                            </tr>
                                        )
                                    }) 
                                    }
                                </tbody>
                            </table>
                            :
                            <p>No Entries Yet!</p>
                        }
                        </div>
                    )
            }
            
            return (
                <div>
                    <p>loading...</p>
                </div>
            )
        }

export default requireAuth()(UserStats)
