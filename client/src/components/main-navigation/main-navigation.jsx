
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import {TopBar, Menu, Button,} from '@bpetii/uio-gui-library';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { logOut, toggleDarkMode } from '../../store/slices/userSlice';
import i18n from 'i18next';
import { useEffect } from 'react';

const MainNavigation = () => {
    const [lang, setLang] = useState(i18n.language)
    const {isDarkMode} = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      const mode = isDarkMode ? 'dark' : 'default'
      document.documentElement.setAttribute('data-theme', mode);
    }, [isDarkMode])

  const content = [
    {
        type: 'Text',
        label: 'Master thesis',
      },
  ];
  const contentRight = [
      {
        type: 'Component',
        component: 
          <DarkModeSwitch
            checked={isDarkMode || false}
            onChange={() => { dispatch(toggleDarkMode()) }}
            size={40}
          />
      },
      {
        type: 'Component',
        component: <Menu menu={{
          sections: [
            {
                label: 'EN',
                onClick: () => {
                    i18n.changeLanguage('en').then(() => setLang('en'));
                },
                type: 'Option',
                selected: lang === 'en'
            },
            {
                label: 'FA',
                onClick: () => {
                  i18n.changeLanguage('fa').then(() => setLang('fa'));
                },
                type: 'Option',
                selected: lang === 'fa'
            },
            {
              label: 'HU',
              onClick: () => {
                i18n.changeLanguage('hu').then(() => setLang('hu'));
              },
              type: 'Option',
              selected: lang === 'hu'
          }
        ],
        component: (<div>
          <Button label={lang} round />
          </div>),
      }}/>,
        label: i18n.language,
        colored: true,
      },
  {
    type: 'Component',
    component: (
        <Menu menu={{
            sections: [
              {
                  label: 'Logout',
                  onClick: () => dispatch(logOut()),
                  type: 'Option'
              }],
            component: (<Button label={<FaUser />} round />),
            left: true
            }}/>
    ),
  },
  ];
  return (
      <TopBar content={content} contentRight={contentRight}/>
  );
}

export default MainNavigation;
