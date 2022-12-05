import React, {useState} from 'react';
import {useSelector} from 'react-redux'
import { useNavigate } from "react-router";
import './login.css';
import { connect } from 'react-redux';
import {authLogin} from '../../store/slices/userSlice';
import {useTranslation} from 'react-i18next';
import {Button, Field, Input, Dialog, Message} from '@bpetii/uio-gui-library';

const Login = ({
  authLogin,
  isSecretary,
  closeModal
}) => {
  const {showInfo} = useSelector(state => state.ui);
  const {t} = useTranslation();
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
      if (isSecretary) {
        navigate('/secretary/profile')
      } else {
        navigate('/patient')
      }
    }).catch(err => {
      setError(err.status);
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

  const emailInfoForPatient=['If you have already registered', 
  'press login and enter your email and password,', 
  'otherwise press the resigter button below to create an account.']

  const emailInfoForSecretary=['If you have already registered', 
  'press login and enter your email and password,', 
  'otherwise contact the administrator to create an account.']
  const loginContent = (
  <>
   {errorMessage}
     <Field label={t("email") + '*'} info={showInfo? isSecretary ? emailInfoForSecretary : emailInfoForPatient : ''}>
      <Input
        name='email'
        placeholder={t("enterYourEmail") + '. E.g: test@test.com'}
        onChange={(evt) => {
          setEmail(evt.target.value);
        } }
        error={!email ? "error" : null}
        value={email} />
    </Field>
    <Field label={t("password") + '*'}>
        <Input
          name='password'
          type='password'
          placeholder={t("enterYourPassword")}
          onChange={(evt) => {
            setPassword(evt.target.value);
          } }
          error={!password ? "errpr" : null}
          value={password} />
      </Field>
    </>
  )

  return (
    <div className='authCard'>
      <Dialog
        dialog={{
          heading: t("login"),
          content: loginContent,
          footer: ( 
          <>
          <Button active type="submit" label ={t("login")} disabled={validateForm()} onClick={handleSubmit} />
          <Button onClick={closeModal} label={t("close")}/>
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