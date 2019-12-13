import React, { useContext, useEffect, useState} from 'react'
import { Context as WhiteListContext } from '../contexts/WhiteListContext'
import RenderTable from '../components/RenderTable'
import WhiteListWrapper from '../components/WhiteListWrapper'
import { NavLink } from 'react-router-dom'
import requireAuth from '../components/requireAuth'

const WhiteList = props => {

     const [activId, setActiveId] = useState(0)


    const {state:{ loaded, entries, error },
        fetchWhiteList, deleteWhiteList
        } = useContext(WhiteListContext)


    useEffect(() => {
        if(!loaded) {
            fetchWhiteList()
        }
    }, [loaded])

    if(!loaded){
        return <p>...loading</p>
    }


    const renderWhiteList = () => {
       return entries.map(entry => {
            if(entry._id === activId){
               return ( <tr key={entry._id}>
                            <WhiteListWrapper id={entry._id} 
                                edit={true} 
                                initialEmail={entry.email} 
                                onCancel={()=>setActiveId(0)}
                                id={entry._id}/>
                        </tr>
               )
            } else {
                return (
                    <tr key={entry._id}>
                        <td>{entry.email}</td>
                            {entry.user.length > 0 ?
                                <>
                                    <td>
                                        <NavLink className="btn light-blue darken-4" to={`/user/${entry.user[0]._id}/${entry._id}`}><i className="material-icons">face</i></NavLink>
                                    </td>
                                    <td></td>
                                </>
                                :
                                <>
                                    <td></td>
                                    <td>
                                        <button className='btn amber' onClick={()=>setActiveId(entry._id)}><i className="material-icons">edit</i></button>
                                    </td>
                                </>
                            }
                        <td><button className='btn red darken-1' onClick={()=>deleteWhiteList(entry._id)}><i className="material-icons">delete_forever</i></button></td>
                    </tr>
                )
            }
        })
    }

    return (
        <>
            <h2>User Email WhiteList</h2>
            { error &&
                <p>Error: {error}</p>
            }
            <table>
                <thead>
                    <tr >
                        <th>New Email</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={1}>
                        <WhiteListWrapper edit={false}
                                        id={1}
                                        />
                    </tr>
                </tbody>
            </table>
            <br />
            {entries.length > 0 ?
                <RenderTable profile={true}>
                    {renderWhiteList()}
                </RenderTable>
            :
                <p>No White List emails!</p>
            }
        </>
    )
}

export default requireAuth(true)(WhiteList)

