import axios from 'axios';
import * as actions from '../api';

const api = ({dispatch, getState}) => next => async action => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const {url, method, data, onStart, onSuccess, onError} = action.payload;

    if (onStart) dispatch({type: onStart});

    next(action);
  
    try {
        const {user} = getState();
        const response = await axios.request({
            headers: {'x-auth-token': user.access_token},
            baseURL: 'http://localhost:4000/api/',
            url, 
            method,
            data
        })

        dispatch(actions.apiCallSuccess(response.data))

        if(onSuccess) dispatch({type: onSuccess, payload: response.data})
    } catch (error) {
        dispatch(actions.apiCallFailed(error))
        if (onError) dispatch({type: onError, payload: error})
    };
}

export default api;