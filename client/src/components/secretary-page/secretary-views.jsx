import React from 'react';
import { Outlet, useNavigate, matchPath } from "react-router-dom";
import { SideBar} from '@bpetii/uio-gui-library';
import { FaCalendar, FaAddressCard, FaMoneyCheckAlt } from 'react-icons/fa';
import {MdWork} from 'react-icons/md'


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
            {
              label:'Workplan',
              value:'/secretary/workplan',
              onClick: () => {navigate('/secretary/workplan')},
              icon: <MdWork />,
              isActive: matches(currentUrl, '/secretary/workplan', true)
      
            },
            {
              label:'Financial Report',
              value:'/secretary/financial-report',
              onClick: () => {navigate('/secretary/financial-report')},
              icon: <FaMoneyCheckAlt />,
              isActive: matches(currentUrl, '/secretary/financial-report', true)
      
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
