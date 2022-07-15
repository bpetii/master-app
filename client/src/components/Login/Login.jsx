import React from 'react';
import './login.css';
const Login = () => {

    return (
        <div className='login'>
            <form className='login__form'>
                <h1>Log In</h1>
                <input
                    type='name'
                    placeholder='Enter username'
										value=''
										onChange={() => {}}
                />
								 <input
                    type='password'
                    placeholder='Enter password'
										value=''
										onChange={() => {}}
                />
                <div className='form__actions'>
                  <button type="submit "className='submit__btn'>Log In</button>
                  <button type="submit "className='submit__btn'>Create Account </button>
                </div>
            </form>
        </div>
    )
}


export default Login