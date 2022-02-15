import React, { useReducer, useEffect } from 'react'


import './Login2.css'

// const loginForm = ({ username, password }) => {
//     if (username === 'kaloian' && password === '123456') return true

//     return false
// }

const Reducer = (state, action) => { 
    switch(action.type){
        case 'field': 
        return {
            ...state,
            [action.fieldName]: action.value
        }
        case 'validation':
        const validation = state.username.length >= 6 && state.password.length >= 6
        return {
            ...state,
            isValid: validation,
            error: validation ? false : 'Username and password must have more than 6 initials',
            LoggedIn: false
        }
        // case 'loginError':
        // return {
        //     ...state,
        //     error: 'Incorrect username or password',
        //     isValid: false,
        // }
        case 'success':
        return {
            ...state,
            isValid: true,
            LoggedIn: true,
        }
        case 'logout':
        return {
            ...state,
            LoggedIn: false,
            username: '',
            password: '',
        }
    }
    return state
}

const initialState = {
    username: '',
    password: '',
    isValid: false,
    error: '',
    LoggedIn: false
}

function Login2() {
  const [state, dispatch] = useReducer(Reducer, initialState)

  const { username, password, isValid, error, LoggedIn } = state

  const submitHandler = (e) => {
      e.preventDefault()

      dispatch({ type: 'validation'})
      
      
      // Login form Option
      //   const loginResult = loginForm({
          //       username: state.username,
          //       password: state.password,
          //   })
          
          //   if(!loginResult) dispatch({ type: 'loginError'})
          
          // redirect to welcome screen
        }
        
        // dispatch success if validation is true
        
        // check if isValid is changed
        useEffect(() => {
            // if isValid is true, dispatch success
            if(isValid) dispatch({ type: 'success' })
        }, [isValid])


  return (
    <div className='div__login2'>
        {LoggedIn ? (
            <div className='welcome'>
            <h1>Welcome {username}!</h1>
            <button className='button' onClick={() => dispatch({ type: 'logout' })}>Logout</button>
            </div>
        ) : (
            <form onSubmit={submitHandler}>
                {error && !isValid  && <p style={{ color: 'red', fontSize: '25px', textAlign: 'center'}} >{error}</p> }
                <h1>Login</h1>
                <input type="text" placeholder='Username' value={username} onChange={e => dispatch({
                    type: 'field',
                    fieldName: 'username',
                    value: e.target.value
                })}/>
                <input type="password" placeholder='Password' autoComplete='on'  value={password} onChange={e => dispatch({
                    type: 'field',
                    fieldName: 'password',
                    value: e.target.value
                })} />
                <button type='submit'>Login</button>
            </form>
            
            ) }
    </div>
  )
}

export default Login2