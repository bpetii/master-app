import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Drawer, List, Flex, Message, Loader, Spinner, Page, Label} from '@bpetii/uio-gui-library';
import Schedule from './schedule/schedule';
import './patient-page.css'
import { DataFilter } from './data-filter/data-filter';
import { useState } from 'react';
import { loadAppointments } from '../../store/slices/appointmentsSlice';

const PatientPage = () => {
  const {doctors, loading, error} = useSelector(state => state.doctors);
  const userid = useSelector(state => state.user.user.id);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const [doctorId, setDoctorId] = useState(null);

  useEffect(() => {
    dispatch(loadAppointments(userid))
  }, [userid])

  const doctorsFiltered = (doctors, filters) => {
    let newList = [...doctors];
    Object.keys(filters).map(filterKey => newList = newList.filter(item => item[filterKey] === filters[filterKey].value))
    return {
      items: newList.map(({id, name}) => ({
        id: id,
        name: name,
        onClick: () => setDoctorId(id),
        active: doctorId === id
      }))}
  };

const filteredDoctors = doctorsFiltered(doctors, filters);

  const errorMessage = error && (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px', marginBottom: '15px' }}>
      <Message message={{
        visible: true,
        content: error,
        type: 'Error',
      }} />
    </div>);

  return (
    <Page left='0' padding='0'>
      <Flex height={'100%'}>
          <div
            style={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
           {doctorId && <Schedule userid={userid} doctorid={doctorId} />} 
          </div>
          <Drawer
            open
            width={350}
            closedWidth={50}
            button={true}
            right={false}
            border={true}
      >
        <div>
          <DataFilter 
            doctors={doctors} 
            filters={filters} 
            setFilters={setFilters} 
          />
          {errorMessage}
          {loading ? (
            <Loader
              width="100%"
              height="100px"
            >
              <Spinner colored/>
            </Loader>
            ): (
              <List 
                  list={filteredDoctors}
              />
              )}
        </div>
        </Drawer>
     </Flex>
      </Page>
  )
}

export default PatientPage;