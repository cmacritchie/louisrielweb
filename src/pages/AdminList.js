import React, { useContext, useEffect, useState } from 'react'
import requireAuth from '../components/requireAuth'
import AdminListWrapper from '../components/AdminListWrapper'
import { Context as AdminContext } from '../contexts/AdminListContext'
import  RenderTable  from '../components/RenderTable'

const AdminList = props => {

    const [activeId, setActiveId] = useState(0)
    const {state:{ loaded, entries },
        fetchAdmins, deleteAdmin 
        } = useContext(AdminContext)

    useEffect(() => {
        if(!loaded){
            fetchAdmins()
        }
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
                         <td></td>
                         <td><button className='btn amber' onClick={()=>setActiveId(entry._id)}><i className="material-icons">edit</i></button></td>
                         <td><button className='btn red darken-1' onClick={()=>deleteAdmin(entry._id)}><i className="material-icons">delete_forever</i></button></td>
                     </tr>
                 )
             }
         })
     }

    return (
        <>
            <h2>Admin Email White List</h2>
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
                <AdminListWrapper edit={false}
                                    id={1}
                                    />
                </tr>
                </tbody>
            </table>
            
            <br />
            { entries.length > 0 ? 
                <RenderTable profile={true}>
                    {renderAdminList()}
                </RenderTable>
            :
                <p>No Admin emails!</p>
            }
        </>
    )
    
}

AdminList.propTypes = {

}

export default requireAuth(false, true)(AdminList)
