import createDataContext from './createDataContext';
import axios from 'axios'

const SIGN_IN_FAIL = 'sign_in_fail'

const userReducer = (state, action) => {
    switch(action.type) {
        case 'googleSignIn':
            return {...state, 
                    user:action.payload,
                    isAuthenticated:true,
                    loading:false
                }
        case 'logOut':
        case SIGN_IN_FAIL:
            return {
                user:null,
                isAuthenticated:false,
                loading:false
            }
    }
}

const fetchUser = dispatch => async () => {
    try {
        const response = await axios.get('/api/current_user')  
        dispatch({type: 'googleSignIn', payload: response.data})
    } catch (e) {
        dispatch({type: SIGN_IN_FAIL})
    }
    
}

const logOut = dispatch => async () => {
    const response = await axios.get('/api/logout')  
    dispatch({type: 'logOut', payload: response.data})
}

export const { Context, Provider } = createDataContext(
    userReducer,
    { fetchUser, logOut },
    { isAuthenticated:false, user: null, loading:false }
)