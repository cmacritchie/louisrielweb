import createDataContext from './createDataContext';
import axios from 'axios'
import { toastSuccess, toastError } from './toasts'
import { socket } from '../api/socketAPI'

import { history } from '../components/App'
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
const USER_LOADING_ERROR = 'loading_error'

const WS_SUBMIT_HOUSE_POINTS = 'ws_submit_house_points'
const WS_DELETE_HOUSE_POINTS = 'ws_delete_house_points'
const WS_PATCH_HOUSE_POINTS = 'ws_delete_house_points'

const housePointReducer = (state, action) => {
    switch(action.type) {
        case FETCH_HOUSE_POINTS:
            return {...state, loaded: true, 
                    sumEntries:action.payload}
        case WS_PATCH_HOUSE_POINTS:
        case WS_SUBMIT_HOUSE_POINTS:
            return {...state, sumEntries: {
                            wolf:state.sumEntries.wolf + action.payload.wolf,
                            bear:state.sumEntries.bear + action.payload.bear,
                            eagle:state.sumEntries.eagle + action.payload.eagle,
                            turtle:state.sumEntries.turtle + action.payload.turtle,
                        } 
                    }
        case WS_DELETE_HOUSE_POINTS:
            return {...state, sumEntries: {
                            wolf:state.sumEntries.wolf - action.payload.wolf,
                            bear:state.sumEntries.bear - action.payload.bear,
                            eagle:state.sumEntries.eagle - action.payload.eagle,
                            turtle:state.sumEntries.turtle - action.payload.turtle,
                        } 
                    }
        case SUBMIT_HOUSE_POINTS:
            return {...state, 
                // entries:[action.payload, ...state.entries], 
                entries:{[action.payload.owner]:{ 
                            ...state.entries[action.payload.owner],
                            housePoints:[
                                action.payload,
                                ...state.entries[action.payload.owner].housePoints
                            ]
                        }
                    }
                }
        case DELETE_HOUSE_POINTS:
            return {...state,
                entries:{...state.entries,
                        [action.payload.owner]: {
                        ...state.entries[action.payload.owner],    
                        housePoints:state.entries[action.payload.owner].housePoints.filter(entry => {
                        return entry._id !== action.payload._id
                    })}
                }
            }
        // case FETCH_MY_HOUSE_POINTS:
        //     return {...state, myEntriesLoaded: true, myEntries:action.payload }
        case PATCH_HOUSE_POINTS:
            return {...state,
                    entries:{...state.entries,
                            [action.payload.owner]: {
                            ...state.entries[action.payload.owner],    
                            housePoints:state.entries[action.payload.owner].housePoints.map(entry => {
                                if(entry._id !== action.payload._id){
                                    return entry
                                }
                                return action.payload
                            }) 
                        }
                    }
                }
        case FETCH_USER_HOUSE_POINTS:
            return {...state, entries:{...state.entries, [action.payload._id]:action.payload }, entryLoaded:true}   
        case USER_ENTRIES_LOADING:
            return {...state, entryLoaded:false }
        case USER_LOADING_ERROR: 
            return {...state, entryLoaded:false } 
        default:
            return state;

    }
}


const wsPostPoints = dispatch => (housePoints) => {
    dispatch({ type: WS_SUBMIT_HOUSE_POINTS, payload: housePoints });   
}

const wsDeletePoints = dispatch => (housePoints) => {
    dispatch({ type: WS_DELETE_HOUSE_POINTS, payload: housePoints });   
}

const wsPatchPoints = dispatch => (housePoints) => {
    dispatch({type: WS_PATCH_HOUSE_POINTS, payload: housePoints})
}

const submitPoints = dispatch => async (points) => {
    try{
        const response = await axios.post('/api/house', points)
        dispatch({ type: SUBMIT_HOUSE_POINTS, payload: response.data });
        history.push(`/user/${response.data.owner}`)
        toastSuccess("House Points Added")
        socket.emit('postingData', response.data, (error) =>{
            console.log('post ws error',error)
        })

    } catch (e) {
        toastError("Error Adding House Points")
    }
}

const comparison =(original, updated)=> {
    const houses = ['wolf', 'bear', 'turtle', 'eagle']
    let difference={}

    houses.forEach(value => {
        difference[value] = updated[value] - original[value]
    })
    return difference
}

const editPoints = dispatch => async (id, points) => {
    
    try{
        const response = await axios.patch(`/api/house/${id}`, points)
        let updated = {...response.data, ...points, updatedAt:Date.now()}
        let original = response.data
        let difference = comparison(original, updated)
        dispatch({ type: PATCH_HOUSE_POINTS, payload: updated })
        socket.emit('patchingData', difference, (error) => {
            console.log('update Error', error)
        })
        history.push(`/user/${response.data.owner}`)
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
        socket.emit('deletingData', response.data, (error) =>{
            console.log('delete ws error',error)
        })
    } catch (e) {
        toastError('Error deleting house points')
    }
}

const fetchUserPoints = dispatch => async (id) => {
    try {
        dispatch({ type:USER_ENTRIES_LOADING })
    
        const response = await axios.get(`/api/userpoints/${id}`)
        const [ user ] = response.data
        
        dispatch({ type: FETCH_USER_HOUSE_POINTS, payload: user });

    } catch (e) {
        dispatch({ type:USER_LOADING_ERROR })
    }
}

export const { Context, Provider } = createDataContext(
    housePointReducer,
    { fetchPoints, submitPoints, deletePoints, 
        wsPatchPoints, wsPostPoints, wsDeletePoints, editPoints, fetchUserPoints },
    { sumEntries:{}, loaded: false, 
    entries:{},
    entryLoaded:false,
    myEntries:[], myEntriesLoaded:false, 
    adminEntries:[] 
    }
)