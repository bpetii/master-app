import React, {useState} from 'react';
import { useNavigate } from "react-router";
import './login.css';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (!username) {
      return;
    } 
    if (!password) {
      return;
    } 

    fetch('http://localhost:4000/auth/login', {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, password})
    }).then(res => {
      if (!res || !res.ok || res.status >= 400) {
        throw Error({form: 'Something went wrong!'});
      }
      return res.json();
    }).then(res => {
      if (!res) return;
      console.log(res);
      navigate('/home');
    }).catch(err => {
        console.log(err);
    });
  }


    return (
        <div className='login'>
            <form className='login__form' onSubmit={handleSubmit}>
                <h1>Log In</h1>
                <input
                    type='name'
                    placeholder='Enter username'
										value={username}
										onChange={(evt) => {
                      setUsername(evt.target.value)
                    }}
                />
								 <input
                    type='password'
                    placeholder='Enter password'
                    value={password}
										onChange={(evt) => {
                      setPassword(evt.target.value)
                    }}
                />
                <div className='form__actions'>
                  <button type="submit "className='submit__btn'>Log In</button>
                  <button className='submit__btn' onClick={() => navigate('/register')}>Create Account </button>
                </div>
            </form>
        </div>
    )
}


export default Login