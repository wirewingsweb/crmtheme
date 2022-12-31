export const isAuthenticated = (state) => {
    console.log(state)
    if (state.auth.auth.accessToken) return true;
    return false;
};

export const userDetails = (state)=>{
    return state.auth.auth.userDetailForFront
}