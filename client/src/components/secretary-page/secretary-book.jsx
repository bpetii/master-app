import React, {useState, useEffect} from 'react';
import { List, Flex, Page, Drawer } from '@bpetii/uio-gui-library';
import Schedule from '../PatientPage/schedule/schedule';
import { useSelector } from 'react-redux';
import DatePicker from 'react-date-picker';



const SecretaryPage = () => {
  const [patients, setPatiens] = useState([]);
  const [date, setDate] = useState(new Date());
 const { access_token} = useSelector(state => state.user.user);

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
        console.log(result)
        setPatiens(result);
      })
  }, [date])

  return (
    <Page left='70px'>
      <Flex height='100%'>
      <div
            style={{
              flexGrow: 1,
            }}
          >
      <DatePicker isOpen={true} onChange={(date) => setDate(date)} value={date}  />
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