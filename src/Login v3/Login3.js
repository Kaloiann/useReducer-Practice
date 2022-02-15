import React, { useEffect, useReducer } from 'react'
import './Login3.css'

const Reducer = (state, action) => {
    switch(action.type){
       case 'field':
           return {
               ...state,
               [action.filedName]: action.value
           }
        case 'validation':
            const validation = state.username.length >= 6 && state.password.length >= 6
            return {
                ...state,
                isValid: validation,
                error: validation ? false : 'Username and Password must be more then 6 initials',
                loggedIn: false
            }
        case 'success':
            return {
                ...state,
                loggedIn: true,
                isValid: true,
            }
        case 'logout':
            return {
                ...state,  
                loggedIn: false,
                username: '',
                password: ''
            }
    }
    return state
}

const initialState = {
    username: '',
    password: '',
    isValid: false,
    error: '',
    loggedIn: false,
}


function Login3() {
    const [state, dispatch] = useReducer(Reducer, initialState)

    const { username, password, isValid, error, loggedIn } = state

    const submitHandler = e => {
        e.preventDefault()

        dispatch({ type: 'validation' })
    }

    useEffect(() => {
        if(isValid) dispatch({ type: 'success' })
    }, [isValid])

  return (
    <div className='login_3'>
        {loggedIn ? (
            <div className='logout'>
                <h1>Welcome {username}!</h1>
                <button onClick={() => dispatch({ type: 'logout' })} >Logout</button>
            </div>
        ) : (
        <form onSubmit={submitHandler}>
            {error && !isValid && <p style={{color: 'red', textAlign: 'center'}}>{error}</p> }
            <h1>Login</h1>
            <input type="text" value={username} onChange={e => dispatch({
                type: 'field',
                filedName: 'username',
                value: e.target.value
            })} placeholder='Username'/>
            <input type="password" value={password} autoComplete="on" onChange={e => dispatch({
                type: 'field',
                filedName: 'password',
                value: e.target.value
            })} placeholder='Password'/>
            <button>Login</button>
        </form>
        ) }
    </div>
  )
}

export default Login3