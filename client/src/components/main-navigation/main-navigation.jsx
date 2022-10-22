
import React , {useState} from 'react';
import { FaUser } from 'react-icons/fa';
import {TopBar, Button} from '@bpetii/uio-gui-library';
import i18n from 'i18next';

const MainNavigation = () => {
    const [lang, setLang] = useState(i18n.language)
  const content = [
    {
        type: 'Text',
        label: 'Master thesis',
      },
  ];
  const contentRight = [
      {
        type: 'Button',
        label: "Dark mode",
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
      <TopBar content={content} contentRight={contentRight}/>
  );
}

export default MainNavigation;
