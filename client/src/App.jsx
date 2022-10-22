
import React, {useState} from 'react';
import Views from './components/Views';
import { FaUser } from 'react-icons/fa';
import {Footer, TopBar, Button} from '@bpetii/uio-gui-library';
import i18n from 'i18next';
import {initReactI18next, useTranslation} from 'react-i18next';

const translationsEn = {
   //pre-login:
  login: "Login",
  register: "Register",

  //login:
  email: "Emal address",
  password: "Password",
  enterYourEmail: "Enter your email address",
  enterYourPassword: "Enter your password",


  doneText: "You scheduled an appointment with {{name}}"
}

/* const translationsHu = {
   //pre-login:
  login: "Bejelentkezés",
  register: "Regisztráció",
} */

const translationsFa = {
  //pre-login:
  login: "ورود به حساب کاربری",
  register: "ثبت نام ",

  //login:
  email:"آدرس ایمیل",
  password: "رمز عبور",
  enterYourEmail: "أدرس ایمیل خود را وارد کنید",
  enterYourPassword: "رمز عبور خود را وارد کنید",
  close: "بستن پنجره",
  
  //register:
  name: "نام و نام خانوادگی",
  enterYourName: "نام و نام خانوادگی خود را وارد کنید",
  createAccount: "ایجاد حساب کاربری",

  //patient page:
  city: "شهر",
  expertise: "تخصص",
  schedule: "تایید",
  doneText: "شما یک وقت ویزیت  با",
  loadingText: "در حال بارگذاری"
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
        en: {translation: translationsEn},
        fa: {translation: translationsFa},
       /*  fa: {trasnlation: translationsFa} */
      },
    lng: "en",
    fallbackLng: "en",
    interpolation: {escapeValue: false}

})


const App = () => {
  const [lang, setLang] = useState(i18n.language)
 const {t} = useTranslation();
 console.log(i18n.language);
 console.log(t("login"))
  const content = [
    {
        type: 'Text',
        label: 'Master thesis',
      },
  ];
  const contentRight = [
      {
        type: 'Button',
        label: t("darkMode"),
        colored: true,
        onClick: () => {},
      },
      {
        type: 'Button',
        label: lang,
        colored: true,
        onClick: (e) => {
          if (lang === 'en') {
            i18n.changeLanguage('fa')
            setLang('fa')
          }
          if (lang === 'fa'){
            setLang('en')
            i18n.changeLanguage('en')
          } 
        },
      },
  {
    type: 'Component',
    component: (
        <Button label={<FaUser />} round onClick={() => {}} />
    ),
  },
  ];
  return (
    <>
      <TopBar content={content} contentRight={contentRight}/>
      <div style={{height:'calc(100vh - 135px)'}}>
        <Views />
      </div>
      <Footer />
    </>
  );
}

export default App;
