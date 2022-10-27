import React, {useState} from 'react';
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

  const loginContent = (
  <>
   {errorMessage}
     <Field label={t("email")}>
      <Input
        name='email'
        placeholder={t("enterYourEmail")}
        onChange={(evt) => {
          setEmail(evt.target.value);
        } }
        error={!email ? "error" : null}
        value={email} />
    </Field>
    <Field label={t("password")}>
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