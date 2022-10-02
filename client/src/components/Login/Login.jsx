import React, {useState} from 'react';
import { useNavigate } from "react-router";
import './login.css';
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import {authLogin} from '../../store/slices/userSlice';
import {Flex, Button, Card, Field, Input} from '@bpetii/uio-gui-library';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({
  authLogin
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let { isSecretary } = useParams();

  
  const navigate = useNavigate();

  const validateForm = () => {
    return  !email || !password;
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    if (validateForm()) return;

    authLogin(email, password, isSecretary).then(() => {
      navigate('/dashboard')
    }).catch(err => {
      toast.error(err.status, {
        autoClose: 2000,
        hideProgressBar: true,
      });
    })
  }

   return (
    <div className='login'>
       <ToastContainer />
      <div className='authCard'>
        <Card raised> 
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
                  <Flex gap="15px">
                    <Button active type="submit" label ='Log In' disabled={validateForm()} onClick={handleSubmit} />
                    <Button onClick={() => navigate('/')} label='Back'/>
                  </Flex>
                </Card>
          </div>
        </div>  
    ) 
  }

  const mapDispatchToProps = {
    authLogin
  };
  
  export default connect(null, mapDispatchToProps)(Login);