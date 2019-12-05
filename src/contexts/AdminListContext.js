import createDataContext from './createDataContext'
import axios from 'axios'
import { toastSuccess, toastError } from './toasts'


const FETCH_ADMINS = 'fetch_admins'
const SUBMIT_ADMIN = 'submit_admin'
const PATCH_ADMIN = 'patch_whitelist'
const DELETE_ADMIN = 'delete_whitelist'

const adminReducer = (state, action) => {
    switch(action.type) {
        case FETCH_ADMINS:
            return {...state, loaded: true, entries:action.payload}
        case SUBMIT_ADMIN:
            return {...state, entries:[action.payload, ...state.entries]}
        case PATCH_ADMIN:
            return {...state, 
                    entries: state.entries.map(entry => {
                        if(entry._id !== action.payload._id){
                            return entry
                        }
                        return action.payload
                    })
                }
        case DELETE_ADMIN:
            return {...state,
                entries: state.entries.filter(entry=> entry._id !== action.payload._id)}
        default:
            return state
    }
}

const submitAdmin = dispatch => async (email) => {
    try{
        const response = await axios.post('/api/admin', {email})
        dispatch({ type: SUBMIT_ADMIN, payload: response.data })
        toastSuccess("Admin Submitted")
    } catch (e) {
        if(e.response.status === 400) {
            toastError("That email already exists")
        } else { 
            toastError("Error Submitting Email")
        }
        
    }
}

const fetchAdmins = dispatch => async () => { 
    try {
        const response = await axios.get('/api/admin')
        dispatch({ type: FETCH_ADMINS, payload: response.data})
    } catch(e) {
        toastError("Error fetching admins")
    }
}

const patchAdmin = dispatch => async(id, email)=>{
    try {
        const response = await axios.patch(`/api/admin/${id}`, {email})
        dispatch({type: PATCH_ADMIN, payload: response.data})
        toastSuccess("Admin Edited")
    } catch (e) {
        if(e.response.status === 400) {
            toastError("Email Already Exists")
        } else { 
            toastError("Error Editing Email")
        }
    }
}

const deleteAdmin = dispatch => async (id) => {
    try{
        const response = await axios.delete(`/api/admin/${id}`)
        dispatch({type: DELETE_ADMIN, payload: response.data})
        toastSuccess("Admin Deleted")
    } catch (e) {
        toastError("Error deleting admins")
    }
}

export const { Context, Provider } = createDataContext(
    adminReducer,
    { submitAdmin, fetchAdmins, patchAdmin, deleteAdmin },
    { entries:[], loaded:false }
)