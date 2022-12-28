import { useEffect } from 'react';
import axios from 'axios';
import { store } from '../store/store';

const axiosInstance = axios.create({
    // baseURL: `https://react-course-b798e-default-rtdb.firebaseio.com/`,
    baseURL: `https://fir-learning-712f5-default-rtdb.firebaseio.com/`,
});
useEffect({

    console.log(axiosInstance,"this is from service")
})
axiosInstance.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth.auth.idToken;
    config.params = config.params || {};
    config.params['auth'] = token;
    return config;
});

export default axiosInstance;
