import createDataContext from './createDataContext';
import axios from 'axios'

const FETCH_WHITELIST = 'fetch_whiteList';
const SUBMIT_WHITELIST = 'submit_whiteList';
const PATCH_WHITELIST = 'patch_whitelist';
const DELETE_WHITELIST = 'delete_whitelist';

const FETCH_WHITELIST_USER = 'fetch_whiteList_user'

const sortByKey = key => (a, b) => a[key] > b[key] ? 1 : -1

const whiteListReducer = (state, action) => {
    switch (action.type) {
        case FETCH_WHITELIST:
            return {...state, loaded:true, entries:action.payload }
        case SUBMIT_WHITELIST:
            return {...state, entries:[action.payload, ...state.entries]}
        case PATCH_WHITELIST:
            
            return {...state, 
                    entries: state.entries.map(entry =>{
                        if(entry._id !== action.payload._id){
                            return entry
                        }
                        return action.payload
                    })
            }
        case DELETE_WHITELIST:
            return {...state,
                    entries: state.entries.filter(entry=> entry._id !== action.payload._id)}
        default:
            return state
    }
}

//submitpoints
const submitWhiteList = dispatch => async (entry) => {
    const response = await axios.post('/api/whitelist', {email:entry})
    dispatch({type: SUBMIT_WHITELIST, payload: response.data})
}

const fetchWhiteList = dispatch => async () => {
    const response = await axios.get('/api/whitelist')
    dispatch({ type: FETCH_WHITELIST, payload: response.data})
}

const patchWhiteList = dispatch => async (id, email) => {
    const response = await axios.patch(`/api/whitelist/${id}`, {email})
    dispatch({type: PATCH_WHITELIST, payload: response.data})
}

const deleteWhiteList = dispatch => async (id) => {
    const response = await axios.delete(`/api/whitelist/${id}`)
    dispatch({type: DELETE_WHITELIST, payload: response.data})
}


//for admin purposes

const fetchWhiteListUser = dispatch => async (id) => {
    const response = await axios.get(`api/whitelistuser/${id}`)
    dispatch({type: FETCH_WHITELIST_USER, payload: response.data})
}

export const { Context, Provider } = createDataContext(
    whiteListReducer,
    { submitWhiteList, fetchWhiteList, patchWhiteList, deleteWhiteList },
    { entries:[], loaded:false }
)