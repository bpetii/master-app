
import React from 'react';
import Views from './components/Views';
import {Footer} from '@bpetii/uio-gui-library';
import {useSelector} from 'react-redux';
import i18n from 'i18next';
import MainNavigation from './components/main-navigation/main-navigation';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {translationsEn, translationsFa, translationsHu} from './translations';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const languageList = [
  {
    value: 'en',
    translation: translationsEn,
  },
  {
    value: 'fa',
    translation: translationsFa,
  },
  {
    value: 'hu',
    translation: translationsHu,
  },
];


const languageResources = (langs) => {
  const obj = {};
  langs.forEach(lng => {
    obj[lng.value] = {
      translation: lng.translation,
    };
  });
  return obj;
};


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: languageResources(languageList),
    debug:true,
    lng: "en",
    fallbackLng: "en",
    react: {
      useSuspense: false,
    },
    interpolation: {escapeValue: false}
})

const App = () => {
  const {isDarkMode} = useSelector(state => state.user);
  return (
    <>
      <ToastContainer theme={isDarkMode? "dark" : "light"}/>
      <MainNavigation />

        <Views />
      <Footer />
    </>
  );
}

export default App;
