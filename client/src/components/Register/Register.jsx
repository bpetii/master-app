import React, {useState} from 'react';
import { useNavigate } from "react-router";
import {Card, Field, Input, Flex, Button} from '@bpetii/uio-gui-library';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import {authRegister} from '../../store/slices/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import {Footer} from '@bpetii/uio-gui-library';
import 'react-toastify/dist/ReactToastify.css';
import './register.css';

const Register = ({
  authRegister
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  let { isSecretary } = useParams();
	const navigate = useNavigate();

  const validateForm = () => {
    return !name || !email || !password;
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (validateForm()) return;
    authRegister(name, email, password, isSecretary).then(() => {
      navigate('/dashboard')
    }).catch((err) => {
      toast.error(err.status)
    })
  }
    return (
      <div className='register'>
        <ToastContainer />
        <div className='authCard'>
        <Card raised> 
            <Field label="Name">
                <Input 
                  name='name'
                  placeholder='Enter your name'
                  onChange={(evt) => {
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
                      setPassword(evt.target.value)
                    }}
                    error={!password? "Empty field" : null}
                    value={password}
                    />
                </Field>
                <Field>
                  <Flex gap='15px'>
                    <Button active type="submit" label ='Create account' onClick={handleSubmit} disabled={validateForm()}/>
                    <Button onClick={() => navigate('/')} label='Back'/>
                  </Flex>
                </Field> 
        </Card>
        </div> 
        <Footer />   
      </div>  
    )
}

const mapDispatchToProps = {
  authRegister,
};

export default connect(null, mapDispatchToProps)(Register);