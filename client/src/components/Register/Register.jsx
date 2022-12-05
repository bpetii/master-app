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

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
	const navigate = useNavigate();

  const validateForm = () => {
    return !firstName || !lastName || !email || !password ;
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    if (validateForm()) return;

    try {
      await authRegister({firstName, lastName, address, zip, city, email, password, isSecretary,});
      navigate('/patient/')
    } catch (err){
      console.error(err);
    }
  }

  const AccountForm={
    title: 'Account form',
    component: (<>
      <Field label={t("email") + '*'} >
        <Input 
          name='email'
          placeholder={t("enterYourEmail") + '. E.g: test@test.com'}
          onChange={(evt) => {
            setEmail(evt.target.value)
          }}
          error={!email? "error" : null}
          value={email}
        />
        </Field>
        <Field label={t("password") + '*'}>
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
      </>
    )};
  
  const AddressForm = {
    title: 'Address form',
    component: (<>
      <Field label='City'>
       <Input
         name='city'
         placeholder='Entery your city'
         onChange={(evt)=>{
          setCity(evt.target.value)
         }}
         value={city}
       />
     </Field>
     <Field label='Zip'>
       <Input
         name='zip'
         placeholder={`Enter your zip (10 digits without '-' sign )`}
         onChange={(evt)=>{
          setZip(evt.target.value)
         }}
         value={zip}
       />
     </Field>
     <Field label='Address'>
       <Input
         name='address'
         placeholder='Enter your address'
         onChange={(evt)=>{
          setAddress(evt.target.value)
         }}
         value={address}
       />
     </Field>
     </>
    )};
  
  const UserForm ={
    title: 'User form',
    component: ( <>
      <Field label='First name*'>
       <Input
         name='firstName'
         placeholder='Enter your first name'
         onChange={(evt)=>{
          setFirstName(evt.target.value)
         }}
         value={firstName}
       />
     </Field>
     <Field label='Last name*'>
       <Input
         name='lastName'
         placeholder='Enter your last name'
         onChange={(evt)=>{
          setLastName(evt.target.value)
         }}
         value={lastName}
       />
     </Field>
     </>
    )};
 
    const {steps, currentStepIndex, step, isFirstStep,isLastStep, back, next, goTo} = useMultistepForm([UserForm, AddressForm,AccountForm])
    const registerContent = (
       <div style={{ width:'500px'}}>
          <ul className="multi-steps">
            {steps.map((step,ix)=> (
              <li onClick={() => goTo(ix)} className={ix === currentStepIndex && 'is-active' }>{step.title}</li>
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
        {isLastStep ? <Button onClick={handleSubmit} label={'Create Account'} disabled={validateForm()}/> : <Button onClick={next} label={'Next'}/>}
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