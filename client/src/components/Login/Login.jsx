import React, {useState} from 'react';
import { useNavigate } from "react-router";
import './login.css';
import { connect } from 'react-redux';
import {authLogin} from '../../store/slices/userSlice';
import {Button, Field, Input, Dialog, Message} from '@bpetii/uio-gui-library';

const Login = ({
  authLogin,
  isSecretary,
  closeModal
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const validateForm = () => {
    return  !email || !password;
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    if (validateForm()) return;

    authLogin(email, password, isSecretary).then(() => {
      navigate('/patient')
    }).catch(err => {
      setError(err.status)
      console.error(err);
    })
  }

  const errorMessage = error && (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px', marginBottom: '15px' }}>
    <Message message={{
      visible: true,
      content: error,
      type: 'Error',
    }} />
  </div>);

  const loginContent = (
  <>
    {errorMessage}
    <Field label="Email address">
      <Input
        name='email'
        placeholder='Enter your email address'
        onChange={(evt) => {
          setEmail(evt.target.value);
        } }
        error={!email ? "Empty field" : null}
        value={email} />
    </Field><Field label="Password">
        <Input
          name='password'
          type='password'
          placeholder='Enter your password'
          onChange={(evt) => {
            setPassword(evt.target.value);
          } }
          error={!password ? "Empty field" : null}
          value={password} />
      </Field>
    </>
  )

  return (
    <div className='authCard'>
      <Dialog
        dialog={{
          heading: "Login",
          content: loginContent,
          footer: ( 
          <>
          <Button active type="submit" label ='Log In' disabled={validateForm()} onClick={handleSubmit} />
          <Button onClick={closeModal} label='Close'/>
          </>
          ),
          onClose: closeModal,
        }}
       >
      </Dialog>
    </div>  
    )
  }

  const mapDispatchToProps = {
    authLogin
  };
  
  export default connect(null, mapDispatchToProps)(Login);