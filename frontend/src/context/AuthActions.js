export const loginStart = (userCredentials)=>({
    type: 'LOGIN_START',

})

export const loginSuccess = (user)=>({
    type: 'LOGIN_SUCCESS',
    payload: user
})

export const login_failure = (error)=>({
    type: 'LOGIN_FAILURE',
    payload: error
})