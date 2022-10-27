import React, {useState, useEffect} from 'react';
import { List, Page, Field, Input, Card, Table, Divider } from '@bpetii/uio-gui-library';
import { useSelector } from 'react-redux';

const headers=[{
  cells: [
    {
      value: 'Patient Name'
    },
    {
      value: 'Doctor Name'
    },
    {
      value: 'Appointment Date'
    }]
  }];

const getPatients = (access_token) => {
  return fetch("http://localhost:4000/api/users/patients",{
    headers: {
      'x-auth-token': access_token
    },
    method: 'GET',
  })
  .then(res => res.json())
}

const getHistory = (userid, access_token) => {
  return fetch("http://localhost:4000/api/users/history?" + new URLSearchParams({userid}),{
    headers: {
      'x-auth-token': access_token
    },
    method: 'GET',
  })
  .then(res => res.json())
}

const Profile = () => {
  const {access_token} = useSelector(state => state.user.user);
  const [patients, setPatiens] = useState([]);
  const [history, setHistory] = useState([]);
  const [filterInput, setFilterInput] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() =>  {
    async function fetchData() {
      const patients = await getPatients(access_token);
      setPatiens(patients);
    }
    fetchData();
   }, [access_token])

  useEffect(() => {
    if (!selectedPatient) return;
    async function fetchData() {
      const history = await getHistory(selectedPatient.id,access_token);
      console.log(history)
      setHistory(history);
    }
    fetchData();
  }, [selectedPatient])

  const patientsFiltered = () => {
    let newList = [...patients];
   /*  Object.keys(filters).map(filterKey => newList = newList.filter(item => item[filterKey] === filters[filterKey].value)) */
    return {
      items: newList.filter(p => p.name.toLowerCase().includes(filterInput.toLowerCase())).map((patient) => ({
        id: patient.id,
        name: patient.name,
        onClick: () => setSelectedPatient(patient),
        active: selectedPatient?.id === patient.id,
        ...patient
      }))}
  };

  const rows = history.map(h => ({
    cells:[{value: h.username}, {value: h.doctorname}, {value: h.datetime}]
  }))

  const filteredPatients = patientsFiltered();

  return (
    <Page left='70px' padding='0'>
        <div>

            <Field label='name'>
                  <Input value={filterInput} onChange={e => setFilterInput(e.target.value)}/>
            </Field>
           
          <div>
            <Card raised>
               <div style={{display: 'flex', justifyContent: 'space-between', height:'700px', gap:'50px'}}>
                   <div style={{flexGrow: 0.5}}>
                      <List bordered list={ filteredPatients} />
                    </div>

                    <div style={{display:'flex', flexDirection: 'column', flexGrow: 1}}>
                      <div style={{flexGrow: 0.5}}>Details</div>
                      <Divider />
                      <Table table={{headers, rows}} />
                  </div>
                </div>
              </Card>
          </div>
        </div>
    </Page>
  )
}

export default Profile;