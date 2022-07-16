import React, {useState} from 'react';
import { useNavigate } from "react-router";
import './register.css';

const Register = () => {
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

    fetch('http://localhost:4000/auth/signup', {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, password})
    }).then(res => {
      if (!res || !res.ok || res.status >= 400) {
				console.log('dds');
        throw Error('Something went wrong!')
      }
      return res.json();
    }).then(res => {
      if (!res.username) {
			} 
    }).catch(err => {
      	console.log(err);
    });
  }
    return (
        <div className='register'>
            <form className='register__form' onSubmit={handleSubmit}>
                <h1>Create account</h1>
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
                  <button type="submit"className='submit__btn'>Create account</button>
                  <button className='submit__btn' onClick={() => navigate('/')}>Back</button>
                </div>
            </form>
        </div>
    )
}


export default Register