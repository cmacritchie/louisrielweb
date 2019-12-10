import createDataContext from './createDataContext';
import axios from 'axios'

const SIGN_IN_FAIL = 'sign_in_fail'
const LOADING_USER = 'loading_user'

const userReducer = (state, action) => {
    switch(action.type) {
        case 'googleSignIn':
            return {...state, 
                    user:action.payload,
                    isAuthenticated:true,
                    loaded:true,
                    loading:false
                }
        case 'logOut':
        case SIGN_IN_FAIL:
            return {
                user:null,
                isAuthenticated:false,
                loaded:false,
                loading:false
            }
        case LOADING_USER:
            return { ...state, loading:true }
    }
}

const fetchUser = dispatch => async () => {
     
    dispatch({type: LOADING_USER})

    try {
        const response = await axios.get('/api/current_user')  
        dispatch({type: 'googleSignIn', payload: response.data})
    } catch (e) {
        dispatch({type: SIGN_IN_FAIL})
    }
    
}

// const deleteUser = dispatch => async (id) => {
//     try {
//         const response = await axios.delete('/api/')
//     } catch (e) {

//     }
// }

const logOut = dispatch => async () => {
    const response = await axios.get('/api/logout')  
    dispatch({type: 'logOut', payload: response.data})
}

export const { Context, Provider } = createDataContext(
    userReducer,
    { fetchUser, logOut},
    { isAuthenticated:false, user: null, loaded:false, loading: true }
)