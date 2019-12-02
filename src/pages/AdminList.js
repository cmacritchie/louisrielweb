import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import AdminListWrapper from '../components/AdminListWrapper'
import { Context as AdminContext } from '../contexts/AdminListContext'
import  RenderTable  from '../components/RenderTable'

const AdminList = props => {

    const [activeId, setActiveId] = useState(0)
    const {state:{ loaded, entries },
        fetchAdmins, deleteAdmin 
        } = useContext(AdminContext)

    useEffect(() => {
        fetchAdmins()
    }, [loaded])

    if(!loaded){
        return <p>...loading</p>
    }

    const renderAdminList = () => {
        return entries.map(entry => {
             if(entry._id === activeId){
                return ( <tr key={entry._id}>
                             <AdminListWrapper id={entry._id} 
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
                         <td><button onClick={()=>setActiveId(entry._id)}>edit</button></td>
                         <td><button onClick={()=>deleteAdmin(entry._id)}>Delete</button></td>
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
                <h2>add to admin List</h2>
                <RenderTable>
                    <tr key={1}>
                    <AdminListWrapper edit={false}
                                        id={1}
                                        />
                    </tr>
                </RenderTable>
                <br />
                <RenderTable>
                    {renderAdminList()}
                </RenderTable>
            </>
        )
    }
}

AdminList.propTypes = {

}

export default AdminList
