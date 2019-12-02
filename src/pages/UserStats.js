import React, { useContext, useEffect, useState} from 'react'
import { Context as HouseContext } from '../contexts/HousePointsContext'
import { Context as UserContext } from '../contexts/UserContext'
import moment from 'moment'
import { NavLink } from 'react-router-dom';

import axios from 'axios'

const UserStats = ({ match }) => {
    const { params } = match
    const userId = params.id

    const {state:{ myEntriesLoaded, entries, myEntries, adminEntries, entryLoaded },
    fetchUserPoints, deletePoints } = useContext(HouseContext)

    const { state: { isAuthenticated, user } } = useContext(UserContext)

    const [isLoaded, setLoaded] = useState(false)
    const [entryList, setEntryList] = useState([])
    const [userProfile, setUserProfile] = useState()

            useEffect(() => {
                if(Object.keys(params).length > 0 && !entries[userId]){
                    // if(user._id === userId ) {
                    //     console.log('my points')
                    // } else {
                    //     console.log('other points')
                        fetchUserPoints(userId)
                    }
                    //setUserProfile(entries[userId])

                   // setUser(adminEntries[userId])
                    //set to axios
                // }
            
            }, [])
        
            
            if(entryLoaded && entries[userId]) {
                const userProfile = entries[userId]
                return( <div>
                        <div>
                            <p>user: {userProfile.name}</p>
                        </div>
                        { userProfile.housePoints.length > 0 ?
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
                                    userProfile.housePoints.map(entry => {
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

 export default UserStats