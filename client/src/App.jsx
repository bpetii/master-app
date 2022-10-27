
import React from 'react';
import Views from './components/Views';
import {Footer, SideBar} from '@bpetii/uio-gui-library';
import i18n from 'i18next';
import MainNavigation from './components/main-navigation/main-navigation';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {translationsEn, translationsFa, translationsHu} from './translations';
import { useSelector } from 'react-redux';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { navigate } from '@reach/router';



i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
        en: {translation: translationsEn},
        fa: {translation: translationsFa},
        hu: {trasnlation: translationsHu},
      },
    debug:true,
    lng: "en",
    fallbackLng: "en",
    react: {
      useSuspense: false,
    },
    interpolation: {escapeValue: false}
})

const sections = [
  {
    heading: 'Secretay Menu',
    items: [
      {
        label: 'Book Appoinment',
        value: '/secretary/book',
        onClick: () => {navigate('/secretary/book')},
        icon: <FaAngleDoubleRight />,
        isActive: true
      },

      {
        label: 'Patient Profile',
        value: '/secretary/profile',
        onClick: () => {navigate('/secretary/profile')},
        icon: <FaAngleDoubleRight />

      },
    ],
  },
];


const App = () => {
  
  const {issecretary} = useSelector(state => state.user?.user || {});
  return (
    <>
      <MainNavigation />
        {issecretary && (
        <SideBar
          options={{
            title: 'Welcome!',
            sections:[...sections],
          }}
          bottom='75px'
          top='60px'
        />
      )}
        <Views />
      <Footer />
    </>
  );
}

export default App;
