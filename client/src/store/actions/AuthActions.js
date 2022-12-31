import {
    formatError,
    login,
    runLogoutTimer,
    saveTokenInCookie,
    // saveTokenInLocalStorage,
    signUp,
    signUpMongo
} from '../../services/AuthService';
import axios from 'axios';


export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed login';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const LOGOUT_ACTION = '[Logout action] logout action';

export function signupAction(name, email, phone, parentId, roles, password, navigate) {
    return (dispatch) => {
        signUpMongo(name, email, phone, parentId, roles, password)
            .then((response) => {
                if(response.data.message=="Request is Unathorized"){
                    alert('unAthorized')
                    return console.log(response.data.message, 'form mongoresponse')
                }else{
                    
                    signUp(email, password)
                        .then((responses) => {
                            saveTokenInCookie(responses.data);
                            runLogoutTimer(
                                dispatch,
                                3600 * 1000,
                                navigate,
                            );
                            dispatch(confirmedSignupAction(response.data));
                            //history.push('/dashboard');
                            // navigate('/dashboard');
                        })
                        console.log(response.data, "from signUp Mongo response")
                    alert(response.data.accessToken)
                }                
            })
            // signUp(email, password)
            //     .then((response) => {
            //         saveTokenInCookie(response.data);
            //         runLogoutTimer(
            //             dispatch,
            //             3600 * 1000,
            //             navigate,
            //         );
            //         dispatch(confirmedSignupAction(response.data));
            //         //history.push('/dashboard');
            //         // navigate('/dashboard');
            //     })
            .catch((error) => {
                const errorMessage = formatError(error.response);
                dispatch(signupFailedAction(errorMessage));
            });
    };
}

export function logout(navigate) {
    localStorage.removeItem('userDetails');
    //history.push('/login');
    navigate('/login');
    return {
        type: LOGOUT_ACTION,
    };
}

export function loginAction(email, password, navigate) {
    return (dispatch) => {
        login(email, password)
            .then((response) => {
                console.log(response.data, 'response data from login')
                // setHeader("Authorization", `Bearer ${response.data.accessToken}`)
                const accessTokenSaved = saveTokenInCookie(response.data);
                if (response) {
                    navigate('/dashboard');
                }
                // runLogoutTimer(
                //     dispatch,
                //     3600 * 1000,
                //     navigate,
                // );
                dispatch(loginConfirmedAction(response.data));
            })
            .catch((error) => {
                console.log("error");
                const errorMessage = formatError(error.response.data);
                dispatch(loginFailedAction(errorMessage));
            });
    };
}

export function loginFailedAction(data) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: data,
    };
}

export function loginConfirmedAction(data) {
    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: data,
    };
}

export function confirmedSignupAction(payload) {
    return {
        type: SIGNUP_CONFIRMED_ACTION,
        payload,
    };
}

export function signupFailedAction(message) {
    return {
        type: SIGNUP_FAILED_ACTION,
        payload: message,
    };
}

export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}
