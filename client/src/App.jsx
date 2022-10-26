
import React from 'react';
import { matchPath } from 'react-router-dom';
import Views from './components/Views';
import {Footer, SideBar} from '@bpetii/uio-gui-library';
import i18n from 'i18next';
import MainNavigation from './components/main-navigation/main-navigation';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {translationsEn, translationsFa, translationsHu} from './translations';
import { useSelector } from 'react-redux';
import { FaAngleDoubleRight } from 'react-icons/fa';



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
    heading: 'First Heading',
    items: [
      {
        label: 'Section A',
        value: '/path/to/something',
        onClick: () => {},
        icon: <FaAngleDoubleRight />
      },

      {
        label: 'Section C',
        value: '/path/to/something',
        onClick: () => {},
        icon: <FaAngleDoubleRight />

      },
      {
        label: 'Experimental Section',
        value: '/path/to/something',
        onClick: () => {},
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
            title: 'Title',
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
