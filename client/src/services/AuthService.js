import axios from 'axios';
import swal from "sweetalert";
import {
    loginConfirmedAction,
    logout,
} from '../store/actions/AuthActions';
import URL from "../config.env"
export function signUp(email, password) {
    //axios call
    const postData = {
        email,
        password,
        returnSecureToken: true,
    };
    console.log(postData)
    return axios.post(
        // `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCdZivAO5V2Lp9mgkMn2S0wZ_C6PTEyFRM`,
        postData,
    );
}
export const signUpMongo = async (name, email, phone, parentId, roles, password) => {
    //axios call
    try {
        const postData = {
            name,
            email,
            phone,
            parentId,
            roles,
            password
        };
        const appliedMongo = await axios.post(
            // `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
            // `${}/user/user-signUp`,
            `http://localhost:4000/user/user-signUp`,
            postData,
            {withCredentials:true}
        )
        console.log(appliedMongo)
        return appliedMongo
    }
    catch (err) {
        console.log(err.message)
    }
}


export const login = async (email, password) => {
    const postData = {
        email,
        password,
    };
    // console.log(postData)
    const loginData = await axios.post(
        // `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
        // `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCdZivAO5V2Lp9mgkMn2S0wZ_C6PTEyFRM`,
        `http://localhost:4000/user/user-login`,
        postData ,
        {withCredentials:true}       
);
    // axios.create({
    
    // withCredentials:true
    // })
    console.log(loginData.data.accessToken)
    return loginData
}

export function formatError(errorResponse) {
    switch (errorResponse.error.message) {
        case 'EMAIL_EXISTS':
            //return 'Email already exists';
            swal("Oops", "Email already exists", "error");
            break;
        case 'EMAIL_NOT_FOUND':
            //return 'Email not found';
            swal("Oops", "Email not found", "error", { button: "Try Again!", });
            break;
        case 'INVALID_PASSWORD':
            //return 'Invalid Password';
            swal("Oops", "Invalid Password", "error", { button: "Try Again!", });
            break;
        case 'USER_DISABLED':
            return 'User Disabled';
        default:
            return '';
    }
}

export function saveTokenInCookie(tokenDetails) {
    console.log(tokenDetails, "from localstorageSet")
    tokenDetails.expireDate = new Date(
        // new Date().getTime() + tokenDetails.expiresIn * 1000,
        new Date().getTime() + 3600 * 1000,
    );
    // document.cookie = `'userDetails', ${JSON.stringify(tokenDetails.accessToken)}`
    // return document.cookie
    // localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
}

export function runLogoutTimer(dispatch, timer, navigate) {
    setTimeout(() => {
        dispatch(logout(navigate));
    }, timer);
}

export function checkAutoLogin(dispatch, navigate) {
    const tokenDetailsString = localStorage.getItem('userDetails');
    let tokenDetails = '';
    if (!tokenDetailsString) {
        dispatch(logout(navigate));
        return;
    }

    tokenDetails = JSON.parse(tokenDetailsString);
    let expireDate = new Date(tokenDetails.expireDate);
    let todaysDate = new Date();

    if (todaysDate > expireDate) {
        dispatch(logout(navigate));
        return;
    }
    dispatch(loginConfirmedAction(tokenDetails));

    const timer = expireDate.getTime() - todaysDate.getTime();
    runLogoutTimer(dispatch, timer, navigate);
}
