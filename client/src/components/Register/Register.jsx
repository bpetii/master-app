import React, {useState} from 'react';
import { useNavigate } from "react-router";
import { Field, Input, Button, Dialog, Message} from '@bpetii/uio-gui-library';
import { connect } from 'react-redux';
import {authRegister} from '../../store/slices/userSlice';
import './register.css';

const Register = ({
  authRegister,
  isSecretary,
  closeModal
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
	const navigate = useNavigate();

  const validateForm = () => {
    return !name || !email || !password;
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    if (validateForm()) return;

    try {
      await authRegister(name, email, password, isSecretary);
      navigate('/patient/')
    } catch (err){
      setError(err.status);
      console.error(err);
    }
  }

  const errorMessage = error && (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px', marginBottom: '15px' }}>
      <Message message={{
        visible: true,
        content: error,
        type: 'Error',
      }} />
    </div>);
  

  const registerContent = ( 
    <> 
      {errorMessage}
      <Field label="Name">
          <Input 
            name='name'
            placeholder='Enter your name'
            onChange={(evt) => {
              const {value} = evt.target;
              if(!value) {
                setError("Name field is empty")
              } else {
                setError('')
              }
              setName(evt.target.value)
            }}
            error={!name? "Empty field" : null}
            value={name}
          /> 
        </Field>
      <Field label="Email address">
          <Input 
            name='email'
            placeholder='Enter your email address'
            onChange={(evt) => {
              const {value} = evt.target;
              if(!value) {
                setError("Email field is empty")
              } else {
                setError('')
              }
              setEmail(evt.target.value)
            }}
            error={!email? "Empty field" : null}
            value={email}
          />
        </Field>
          <Field label="Password">
            <Input 
              name='password'
              type='password'
              placeholder='Enter your password'
              onChange={(evt) => {
                const {value} = evt.target;
                if(!value) {
                  setError("Password field is empty")
                } else {
                  setError('')
                }
                setPassword(evt.target.value)
              }}
              error={!password? "Empty field" : null}
              value={password}
              />
          </Field>
  </>);

 return (
  <div className='authCard'>
    <Dialog
      dialog={{
        heading: "Register",
        content: registerContent,
        footer: ( 
        <>
        <Button active type="submit" label ='Create account' onClick={handleSubmit} disabled={validateForm()}/>
        <Button onClick={() => closeModal()} label='Close'/>
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
  authRegister,
};

export default connect(null, mapDispatchToProps)(Register);