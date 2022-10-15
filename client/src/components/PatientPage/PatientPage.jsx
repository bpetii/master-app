import React from 'react';
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../../store/slices/userSlice';
import {Drawer, List, Flex, Spacer, Field, CustomSelect} from '@bpetii/uio-gui-library';
import './patient-page.css'
import { DataFilter } from './data-filter';

const MOCK_LIST = [
  {
    id: 1,
    name: 'Aardvark',
  },
  {
    id: 2,
    name: 'Kangaroo',
    active: true,
  },
  {
    id: 3,
    name: 'Jaguar',
  },
];

const PatientPage = () => {
  const userState = useSelector(state => state.user);
  const {user} = userState;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logounHandler = () => {
      dispatch(logout());
      navigate('/');
  }
  return (
    <>
      <Flex height="calc(100vh - 75px)">
          <div
            style={{
              flexGrow: 1,
              padding: 20,
            }}
          >
            Page content
          </div>
          <Drawer
            open
            width={350}
            closedWidth={50}
            button={true}
            right={false}
            border={true}
      >
        <div >
          <DataFilter />
          <List 
            list={{items: MOCK_LIST}}
          />
        </div>
        </Drawer>
     </Flex>
      </>
  )
}

export default PatientPage;