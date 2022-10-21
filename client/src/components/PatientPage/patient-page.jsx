import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Drawer, List, Flex, Message, Loader, Spinner} from '@bpetii/uio-gui-library';
import Schedule from './schedule/schedule';
import './patient-page.css'
import { DataFilter } from './data-filter/data-filter';
import { loadDoctors } from '../../store/slices/doctorsSlice';

const PatientPage = () => {
  const {doctors, loading, error} = useSelector(state => state.doctors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDoctors())
  }, [])

  const errorMessage = error && (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px', marginBottom: '15px' }}>
      <Message message={{
        visible: true,
        content: error,
        type: 'Error',
      }} />
    </div>);

  return (
    <>
      <Flex height="calc(100vh - 75px)">
          <div
            style={{
              flexGrow: 1,
              padding: 20,
            }}
          >
            <Schedule />
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
          {errorMessage}
          {true ? (
            <Loader
              width="100%"
              height="100px"
            >
              <Spinner colored/>
            </Loader>
            ): (
              <List 
                  list={{items: doctors}}
              />
              )}
        </div>
        </Drawer>
     </Flex>
      </>
  )
}

export default PatientPage;