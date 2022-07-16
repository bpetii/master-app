import React, {useState} from 'react';
import { useNavigate } from "react-router";
import './register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState({}); 
	const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (!username) {
      setErrorMessages({...errorMessages, username: 'Missing username'});
      return;
    }
    if (!password) {
      setErrorMessages({...errorMessages, password: 'Missing password'});
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
			console.log(res);
      if (!res || !res.ok || res.status >= 400) {
        setErrorMessages({...errorMessages, form: 'Something went wrong!'});
        return;
      }
      return res.json();
    }).then(res => {
      console.log(res);
      setErrorMessages({});
    }).catch(err => {
      setErrorMessages({...errorMessages, form: err?.message});
    });
  }

    return (
        <div className='register'>
            <form className='register__form' onSubmit={handleSubmit}>
                {errorMessages?.form && <div>{errorMessages.form}</div>}
                <h1>Create account</h1>
                {errorMessages?.username && <div>{errorMessages.username}</div>}
                <input
                    type='name'
                    placeholder='Enter username'
										value={username}
										onChange={(evt) => {
                      setUsername(evt.target.value)
                    }}
                />
                  {errorMessages?.password && <div>{errorMessages.password}</div>}
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