
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import {TopBar, Menu, Button, Toggle} from '@bpetii/uio-gui-library';
import DarkModeToggle from '../dark-mode-toggle/dark-mode-toggle';
import { toggleShowInfo, toggleShowDarkMode, toggleShowLanguage } from '../../store/slices/uiSlice';
import { logOut, toggleDarkMode } from '../../store/slices/userSlice';
import i18n from 'i18next';
import { useEffect } from 'react';

const MainNavigation = () => {
    const [lang, setLang] = useState(i18n.language)
    const {isDarkMode} = useSelector(state => state.user);
    const {showInfo, showDarkMode, showLanguage} = useSelector(state => state.ui);
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
      ...showDarkMode? [{
        type: 'Component',
        component: 
          <DarkModeToggle
            checked = {isDarkMode}
            onChange={() => { dispatch(toggleDarkMode()) }}
          />
      }]: [{}],
      ...showLanguage ? [{
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
      }]: [{}],
  {
    type: 'Component',
    component: (
        <Menu menu={{
            sections: [
            {
              label: 'Logout',
              onClick: () => dispatch(logOut()),
              type: 'Option'
            },
            {
              label: <Toggle
              label="Show info"
              checked={showInfo}
              onChange={()=> dispatch(toggleShowInfo())}
              />,
              type: 'Option'
            },
            {
              label: <Toggle
              label="Show dark mode"
              checked={showDarkMode}
              onChange={()=> dispatch(toggleShowDarkMode())}
              />,
              type: 'Option'
            },
            {
              label: <Toggle
              label="Show language"
              checked={showLanguage}
              onChange={()=> dispatch(toggleShowLanguage())}
               />,
               type: 'Option'
            },
            ],
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
