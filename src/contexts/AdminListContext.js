import createDataContext from './createDataContext'
import axios from 'axios'


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
    const response = await axios.post('/api/admin', {email})
    dispatch({ type: SUBMIT_ADMIN, payload: response.data })
}

const fetchAdmins = dispatch => async () => { 
    const response = await axios.get('/api/admin')
    dispatch({ type: FETCH_ADMINS, payload: response.data})
}

const patchAdmin = dispatch => async(id, email)=>{
    const response = await axios.patch(`/api/admin/${id}`, {email})
    dispatch({type: PATCH_ADMIN, payload: response.data})
}

const deleteAdmin = dispatch => async (id) => {
    const response = await axios.delete(`/api/admin/${id}`)
    dispatch({type: DELETE_ADMIN, payload: response.data})
}

export const { Context, Provider } = createDataContext(
    adminReducer,
    { submitAdmin, fetchAdmins, patchAdmin, deleteAdmin },
    { entries:[], loaded:false }
)