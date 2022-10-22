import React, {useState} from 'react';
import { useNavigate } from "react-router";
import { Field, Input, Button, Dialog} from '@bpetii/uio-gui-library';
import { connect } from 'react-redux';
import {useTranslation} from 'react-i18next';
import {authRegister} from '../../store/slices/userSlice';
import './register.css';

const Register = ({
  authRegister,
  isSecretary,
  closeModal
}) => {
  const {t} = useTranslation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
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
      console.error(err);
    }
  }

  const registerContent = ( 
    <> 
      <Field label={t("name")}>
          <Input 
            name='name'
            placeholder={t("enterYourName")}
            onChange={(evt) => {
              setName(evt.target.value)
            }}
            error={!name? "error" : null}
            value={name}
          /> 
        </Field>
      <Field label={t("email")}>
          <Input 
            name='email'
            placeholder={t("enterYourEmail")}
            onChange={(evt) => {
              setEmail(evt.target.value)
            }}
            error={!email? "error" : null}
            value={email}
          />
        </Field>
          <Field label={t("password")}>
            <Input 
              name='password'
              type='password'
              placeholder={t("enterYourPassword")}
              onChange={(evt) => {
                setPassword(evt.target.value)
              }}
              error={!password? "error" : null}
              value={password}
              />
          </Field>
  </>);

 return (
  <div className='authCard'>
    <Dialog
      dialog={{
        heading: t("register"),
        content: registerContent,
        footer: ( 
        <>
        <Button active type="submit" label ={t("createAccount")} onClick={handleSubmit} disabled={validateForm()}/>
        <Button onClick={() => closeModal()} label={t("close")}/>
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