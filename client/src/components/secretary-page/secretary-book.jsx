import React, {useState, useEffect} from 'react';
import { List, Flex, Page, Drawer } from '@bpetii/uio-gui-library';
import Schedule from '../PatientPage/schedule/schedule';
import { useSelector } from 'react-redux';
import { DayPicker } from 'react-day-picker';
import { format, formatRelative  } from 'date-fns';
import 'react-day-picker/dist/style.css';
import i18n from 'i18next';
import { CustomDayPicker } from '../day-picker/day-picker';


const SecretaryPage = () => {
  const [patients, setPatiens] = useState([]);
  const [date, setDate] = useState(new Date());
 const { access_token} = useSelector(state => state.user.user);
  const handleDaySelected = (date) => {
    //TODO manipulate the date 
    setDate(date)
  }

  useEffect(() => {
    fetch("http://localhost:4000/api/users?" + new URLSearchParams({date: date.toISOString()}),{
      headers: {
        'x-auth-token': access_token
      },
      method: 'GET',
    })
    .then(res => res.json())
    .then(
      (result) => {
        const formattedPatients = result.map(patient => ({...patient, metadata: patient.metadata=`${patient.doctorname} • ${formatRelative(new Date(patient.datetime), new Date())}`}));
        setPatiens(formattedPatients);
      })
  }, [date])

  return (
    <Page left='70px' padding='0'>
      <Flex height='100%'>
      <div
            style={{
              flexGrow: 1,
            }}
          >
      <CustomDayPicker
        mode="single"
        value={date}
        onSelect={handleDaySelected}
    />
      </div>
          <Drawer
            open
            width={350}
            closedWidth={50}
            right={true}
            border={true}
      >
            <List 
                  list={{items: patients}}
              />
        </Drawer>
     </Flex>
    </Page>
  )
}

export default SecretaryPage;