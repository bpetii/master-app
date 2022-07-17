import React, {useState} from 'react';
import { useNavigate } from "react-router";
import './login.css';
const Login = ({setAuth}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    if (!username) {
      return;
    } 
    if (!password) {
      return;
    } 

    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password})
      });
      const parseRes = await response.json();
      console.log(parseRes);
      if (parseRes.access_token) {
        localStorage.setItem("token", parseRes.access_token)
        navigate("/dashboard")
        setAuth(true)
      }
    } catch (err){
      console.error(err);
      setAuth(false)
    }
 
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