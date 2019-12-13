import createDataContext from './createDataContext';
import { toastSuccess, toastError } from './toasts'
import axios from 'axios'

const FETCH_WHITELIST = 'fetch_whiteList';
const SUBMIT_WHITELIST = 'submit_whiteList';
const PATCH_WHITELIST = 'patch_whitelist';
const DELETE_WHITELIST = 'delete_whitelist';
const ERROR_WHITELIST = 'error_whitelist';

const FETCH_WHITELIST_USER = 'fetch_whiteList_user'

const whiteListReducer = (state, action) => {
    switch (action.type) {
        case FETCH_WHITELIST:
            return {...state, loaded:true, entries:action.payload }
        case SUBMIT_WHITELIST:
            return {...state, entries:[{...action.payload, user:[]}, ...state.entries], error:null}
        case PATCH_WHITELIST: 
            return {...state, error:null,
                    entries: state.entries.map(entry =>{
                        if(entry._id !== action.payload._id){
                            return entry
                        }
                        return {...action.payload, user:[] }
                    })
            }
        case DELETE_WHITELIST:
            return {...state, error:null,
                    entries: state.entries.filter(entry=> entry._id !== action.payload._id)}
        case ERROR_WHITELIST:
            return {...state, error: action.payload }
        default:
            return state
    }
}

const errorHandler = (errorCode) => {
    switch(errorCode){
        case 400:
            return 'Email Already in White List'
        case 504:
            return 'Check Internet Connection or Contact System Administrator'
        default:
            return `error occured, please contact system administrator. Error code: ${errorCode}`
    }
}

//submitpoints
const submitWhiteList = dispatch => async (entry) => {

    try {
        const response = await axios.post('/api/whitelist', {email:entry})
        toastSuccess("Email Added")
        dispatch({type: SUBMIT_WHITELIST, payload: response.data})
    } catch (e) {
        toastError(errorHandler(e.response.status))
        dispatch({type: ERROR_WHITELIST, payload: errorHandler(e.response.status) })
    }
}

const fetchWhiteList = dispatch => async () => {
    const response = await axios.get('/api/whitelist')
    dispatch({ type: FETCH_WHITELIST, payload: response.data})
}

const patchWhiteList = dispatch => async (id, email) => {
    try{
        const response = await axios.patch(`/api/whitelist/${id}`, {email})
        toastSuccess('Email Updated')
        dispatch({type: PATCH_WHITELIST, payload: response.data})
    } catch (e) {
        toastError(errorHandler(e.response.status))
        dispatch({type: ERROR_WHITELIST, payload: errorHandler(e.response.status)})
        
    }
    
}

const deleteWhiteList = dispatch => async (id) => {
    try{
        const response = await axios.delete(`/api/whitelist/${id}`)
        toastSuccess('Email Deleted')
        dispatch({type: DELETE_WHITELIST, payload: response.data})
        // toastSuccess('Email Deleted')
    } catch (e) {
        toastError('Error Deleting Email')
    }
}


//for admin purposes

// const fetchWhiteListUser = dispatch => async (id) => {
//     const response = await axios.get(`api/whitelistuser/${id}`)
//     dispatch({type: FETCH_WHITELIST_USER, payload: response.data})
// }

export const { Context, Provider } = createDataContext(
    whiteListReducer,
    { submitWhiteList, fetchWhiteList, patchWhiteList, deleteWhiteList },
    { entries:[], loaded:false, error:null }
)