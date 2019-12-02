import React, { useContext, useEffect, useState} from 'react'
import { Context as WhiteListContext } from '../contexts/WhiteListContext'
import RenderTable from '../components/RenderTable'
import WhiteListWrapper from '../components/WhiteListWrapper'
import { NavLink } from 'react-router-dom'

const WhiteList = props => {

     const [activId, setActiveId] = useState(0)


    const {state:{ loaded, entries },
        fetchWhiteList, deleteWhiteList
        } = useContext(WhiteListContext)


    useEffect(() => {
        fetchWhiteList()
    }, [loaded])

    if(!loaded){
        return <p>...loading</p>
    }



    const renderWhiteList = () => {
        console.log(entries)
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
                        <td>
                            {entry.user.length > 0 &&
                                <NavLink to={`/user/${entry.user[0]._id}`}> hello</NavLink>
                            }
                            
                        
                        </td>
                        <td><button onClick={()=>setActiveId(entry._id)}>edit</button></td>
                        <td><button onClick={()=>deleteWhiteList(entry._id)}>Delete</button></td>
                    </tr>
                )
            }
        })
    }

    if(entries.length === 0) {
        return <p>No White List emails!</p>
    } else {

        return (
            <>
                <h2>add to whiteList</h2>
                <RenderTable>
                    <tr key={1}>
                    <WhiteListWrapper edit={false}
                                        id={1}
                                        />
                    </tr>
                </RenderTable>
                <br />
                <RenderTable>
                    {renderWhiteList()}
                </RenderTable>
            </>
        )
    }
}

WhiteList.propTypes = {

}

export default WhiteList

