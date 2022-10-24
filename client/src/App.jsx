
import React from 'react';
import Views from './components/Views';
import {Footer,} from '@bpetii/uio-gui-library';
import i18n from 'i18next';
import MainNavigation from './components/main-navigation/main-navigation';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {translationsEn, translationsFa, translationsHu} from './translations';

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


const App = () => {
  return (
    <>
      <MainNavigation />
      <div style={{height:'calc(100vh - 135px)'}}>
        <Views />
      </div>
      <Footer />
    </>
  );
}

export default App;
