import createDataContext from './createDataContext';
import axios from 'axios'
import { toastSuccess, toastError } from './toasts'
import { socket } from '../api/socketAPI'
// import socketIOClient from "socket.io-client";

// const endPoint = 'http://localhost:5000'
// const socket = socketIOClient(endPoint);

const FETCH_HOUSE_POINTS = 'fetch_points'
const SUBMIT_HOUSE_POINTS = 'submit_points'
const PATCH_HOUSE_POINTS = 'patch_points'
const DELETE_HOUSE_POINTS = 'delete_points'
const FETCH_MY_HOUSE_POINTS = 'fetch_my_house_points'
const FETCH_USER_HOUSE_POINTS = 'fetch_user_house_points'
const USER_ENTRIES_LOADING = 'loading_entries'

const WS_SUBMIT_HOUSE_POINTS = 'ws_submit_house_points'

const housePointReducer = (state, action) => {
    switch(action.type) {
        case FETCH_HOUSE_POINTS:
            return {...state, loaded: true, 
                    sumEntries:action.payload}
        case WS_SUBMIT_HOUSE_POINTS:
            return {...state, sumEntries: {
                            wolf:state.sumEntries.wolf + action.payload.wolf,
                            bear:state.sumEntries.bear + action.payload.bear,
                            eagle:state.sumEntries.eagle + action.payload.eagle,
                            turtle:state.sumEntries.turtle + action.payload.turtle,
                        } 
                    }
        case SUBMIT_HOUSE_POINTS:
            return {...state, 
                // entries:[action.payload, ...state.entries], 
                myEntries:[action.payload, ...state.myEntries]}
        case DELETE_HOUSE_POINTS:
            return {...state,
                myEntries: state.myEntries.filter(entry => {
                        return entry._id !== action.payload._id
                    })}
        // case FETCH_MY_HOUSE_POINTS:
        //     return {...state, myEntriesLoaded: true, myEntries:action.payload }
        case PATCH_HOUSE_POINTS:
            return {...state,
                    myEntries: state.myEntries.map(entry => {
                        if(entry._id !== action.payload._id){
                            return entry
                        }
                        return action.payload
                    }) 
                }
        case FETCH_USER_HOUSE_POINTS:
            return {...state, entries:{...state.entries, [action.payload._id]:action.payload }, entryLoaded:true}   
        case USER_ENTRIES_LOADING:
            return {...state, entryLoaded:false }
        default:
            return state;

    }
}


const wsUpdatePoints = dispatch => (housePoints) => {
    console.log(housePoints)
    dispatch({ type: WS_SUBMIT_HOUSE_POINTS, payload: housePoints });   
}

const submitPoints = dispatch => async (points) => {
    try{
        const response = await axios.post('/api/house', points)
        dispatch({ type: SUBMIT_HOUSE_POINTS, payload: response.data });
        toastSuccess("House Points Added")
        socket.emit('incomingData', response.data, (error) =>{
            console.log('post ws error',error)
        })

    } catch (e) {
        toastError("Error Adding House Points")
    }
}

const editPoints = dispatch => async (id, points) => {
    try{
        const response = await axios.patch(`/api/house/${id}`, points)
        dispatch({ type: PATCH_HOUSE_POINTS, payload: response.data })
        toastSuccess("House Points Edited")
    } catch (e) {
        toastError("Error Adding House Points")
    }
    
}

const fetchPoints = dispatch => async () => {
    const response = await axios.get('/api/house')
    const [sumPoints] = response.data
    
    dispatch({ type: FETCH_HOUSE_POINTS, payload: sumPoints });
}

const deletePoints = dispatch => async (id) => {
    try {
        const response = await axios.delete(`/api/house/${id}`)
        dispatch({type: DELETE_HOUSE_POINTS, payload: response.data })
        toastSuccess('House Points Deleted')
    } catch (e) {
        toastError('Error deleting house points')
    }
}

const fetchMyPoints = dispatch => async () => {
    const response = await axios.get('/api/myhouse')
    dispatch({ type: FETCH_MY_HOUSE_POINTS, payload: response.data });
}

const fetchUserPoints = dispatch => async (id) => {
    dispatch({ type:USER_ENTRIES_LOADING })

    const response = await axios.get(`/api/userpoints/${id}`)
    const [ user ] = response.data

    dispatch({ type: FETCH_USER_HOUSE_POINTS, payload: user });
}

export const { Context, Provider } = createDataContext(
    housePointReducer,
    { fetchPoints, submitPoints, deletePoints, 
        wsUpdatePoints, fetchMyPoints, editPoints, fetchUserPoints },
    { sumEntries:{}, loaded: false, 
    entries:{},
    entryLoaded:false,
    myEntries:[], myEntriesLoaded:false, 
    adminEntries:[] 
}
)