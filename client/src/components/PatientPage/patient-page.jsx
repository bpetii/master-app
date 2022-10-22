import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Drawer, List, Flex, Message, Loader, Spinner} from '@bpetii/uio-gui-library';
import Schedule from './schedule/schedule';
import './patient-page.css'
import { DataFilter } from './data-filter/data-filter';
import { loadDoctors, doctorSelected } from '../../store/slices/doctorsSlice';
import { useState } from 'react';
import { loadAppointments } from '../../store/slices/appointmentsSlice';

const PatientPage = () => {
  const {doctors, loading, error, selectedDoctor} = useSelector(state => state.doctors);
  const userid = useSelector(state => state.user.user.id);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    dispatch(loadDoctors())
    dispatch(loadAppointments(userid))
  }, [])

  const doctorsFiltered = (doctors, filters) => {
    let newList = [...doctors];
    Object.keys(filters).map(filterKey => newList = newList.filter(item => item[filterKey] === filters[filterKey].value))
    return {
      items: newList.map(({id, name}) => ({
        id: id,
        name: name,
        onClick: () => dispatch(doctorSelected(id)),
        active: selectedDoctor?.id === id
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
    <>
      <Flex height="calc(100vh - 75px)">
          <div
            style={{
              flexGrow: 1,
              padding: 20,
            }}
          >
           {selectedDoctor && <Schedule userid={userid} doctorid={selectedDoctor.id} />} 
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
      </>
  )
}

export default PatientPage;