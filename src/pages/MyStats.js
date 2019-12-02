import React, { useContext, useEffect} from 'react'
import { Context as HouseContext } from '../contexts/HousePointsContext'
import moment from 'moment'
import { NavLink } from 'react-router-dom';

const MyStats = props => {

    const {state:{ myEntriesLoaded, myEntries },
            fetchMyPoints, deletePoints } = useContext(HouseContext)

    useEffect(() => {
        fetchMyPoints()
    }, [myEntriesLoaded])

    if(myEntriesLoaded){
        return( <div>
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
                           myEntries.map(entry => {
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
                </div>
            )
    }

    return (
        <div>
            <p>myStats</p>
        </div>
    )
}

MyStats.propTypes = {

}

export default MyStats
