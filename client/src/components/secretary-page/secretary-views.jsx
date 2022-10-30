import React from 'react';
import { Outlet, useNavigate, matchPath } from "react-router-dom";
import { SideBar} from '@bpetii/uio-gui-library';
import { FaAngleDoubleRight, FaCalendar, FaAddressCard } from 'react-icons/fa';

const isMatch = (match) => typeof match === 'object' && match !== null;

const matches = (url, path, exact) => isMatch(matchPath({ path, exact },url,));

const SecretaryViews = () => {
    const navigate = useNavigate();
    const currentUrl = window.location.pathname;
    const sections = [
        {
          heading: 'Secretay Menu',
          items: [
            {
              label: 'Book Appoinment',
              value: '/secretary/book',
              onClick: () => {navigate('/secretary/book')},
              icon: <FaCalendar />,
              isActive: matches(currentUrl, '/secretary/book', true)
            },
      
            {
              label: 'Patient Profile',
              value: '/secretary/profile',
              onClick: () => {navigate('/secretary/profile')},
              icon: <FaAddressCard />,
              isActive: matches(currentUrl, '/secretary/profile', true)
      
            },
          ],
        },
      ];
      
    return(
        <>
         <SideBar
              options={{
                title: 'Welcome!',
                sections:[...sections],
              }}
              bottom='75px'
              top='60px'
            />
        <Outlet />
        </>    
    );
};

export default SecretaryViews;
