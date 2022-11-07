import React, {useState} from 'react';
import { useNavigate } from "react-router";
import { Field, Input, Button, Dialog} from '@bpetii/uio-gui-library';
import { connect } from 'react-redux';
import {useTranslation} from 'react-i18next';
import {authRegister} from '../../store/slices/userSlice';
import './register.css';
import { useMultistepForm } from './useMultistepForm';

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

  const AccountForm={
    title: 'Account form',
    component: (<>
      <Field label={'*' + t("email")} >
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
        <Field label={'*' + t("password")}>
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
      </>)
  }
  

  const AddressForm = {
    title: 'Address form',
    component: (<>
      <Field label='City'>
       <Input
         name='City'
         placeholder='city'
         onChange={()=>{}}
       />
     </Field>
     <Field label='Zip'>
       <Input
         name='Zip'
         placeholder='zip'
         onChange={()=>{}}
       />
     </Field>
     <Field label='Address'>
       <Input
         name='Address'
         placeholder='address'
         onChange={()=>{}}
       />
     </Field>
     </>)
  }
  

  const UserForm ={
    title: 'User form',
    component: ( <>
      <Field label='First name'>
       <Input
         name='Name'
         placeholder='name'
         onChange={()=>{}}
       />
     </Field>
     <Field label='Last name'>
       <Input
         name='Last name'
         placeholder='last name'
         onChange={()=>{}}
       />
     </Field>
     </>)
  }
 

    const {steps, currentStepIndex, step, isFirstStep,isLastStep, back, next} = useMultistepForm([UserForm, AddressForm,AccountForm])
    const registerContent = (
       <div style={{ position: 'relative', width:'500px', paddingTop:'30px'}}>
            <ul className="multi-steps">
              {steps.map((step,ix)=> (
                <li className={ix === currentStepIndex && 'is-active' }>{step.title}</li>
              ))}
            </ul>
        {step.component}
       </div>);


 return (
    <Dialog
      dialog={{
        heading: t("register"),
        content: registerContent,
        footer: ( 
        <>
        {!isFirstStep ? <Button onClick={back} label='Back' /> : <Button onClick={() => closeModal()} label='Close'/>}
        {isLastStep ? <Button onClick={handleSubmit} label={'Create Account'}/> : <Button onClick={next} label={'Next'}/>}
        </>
        ),
        onClose: closeModal,
      }}
     >
    </Dialog>
    )
}

const mapDispatchToProps = {
  authRegister,
};

export default connect(null, mapDispatchToProps)(Register);