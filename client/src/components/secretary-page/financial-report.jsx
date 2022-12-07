import React, {useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Page,List, Field, Input, Toggle, Label, Spacer, Button } from '@bpetii/uio-gui-library';
import {  addDays } from 'date-fns';
import { CustomDayPicker } from '../day-picker/day-picker';
import {HiPrinter} from 'react-icons/hi'

const getPatients= (doctorid, access_token, isMultiple, dateValue) => {
  let from =null;
  let to =null;
  let datetime = null;
  if (isMultiple) {
      from = dateValue.from.toISOString();
      to = dateValue.to.toISOString()
  } else {
      datetime = dateValue.toISOString()
  }

  return fetch("http://localhost:4000/api/users/financial?" + new URLSearchParams({ doctorid, isMultiple, datetime, from, to}),{
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': access_token
    }
  }).then(res => res?.json())
};

const FinancialReport = () => {
  const {showInfo} = useSelector(state => state.ui);
  const todayDate = new Date();
  const { access_token, doctorid} = useSelector(state => state.user.user);
  const [patients, setPatiens] = useState({items: []});
  const [datetime, setDatetime] = useState(todayDate);
  const [isMultiple, setMultiple] = useState(false);
  const [range, setRange] = useState({from: todayDate, to: addDays(todayDate,1)});

  useEffect(() => {
    async function fetchData() {
      if (isMultiple && (!range?.from || !range?.to)) return;
      const dateValue = isMultiple? range : datetime;
      const result = await getPatients(doctorid, access_token, isMultiple, dateValue);
      const listOfPatiens = {
        items: result.map((patient) => ({
        ...patient,
        metadata: patient.money
      }))}
      setPatiens(listOfPatiens);
    }

    fetchData();
  }, [datetime, range, isMultiple]);

  const sum = patients.items.reduce((prev, cur) => {
    return prev+ +cur.metadata;
  },0)
 
  return (
    <Page left='70px' padding='0'>
        <div style={{display: 'grid', gridTemplateColumns: '500px 500px', gap: '2rem', margin: 'auto 100px', justifyContent: 'center'}}>
          <div>
          <Label label='Financial Report' info={showInfo && ['Use the calendar to select a specific date if you need the information between two dates toggle the Use range and use mouse drag to select your range', 'The information is displayed on the right column']}/>
          <Spacer />
            <Toggle label="Use range" onChange={() => setMultiple(prev=> !prev)} checked={isMultiple}/>
            <CustomDayPicker
              mode={isMultiple ? 'range' : 'single'}
              value={isMultiple? range : datetime}
              onSelect={isMultiple ? setRange : setDatetime}
           />
          </div> 
        <div style={{display: 'flex', gap: '30px', flexDirection: 'column',  marginBottom: '-14px', marginTop: '40px'}}>
          <div id='div-id-name'>
          <List 
            list={patients}
          />
             <Field label="Total: ">
            <Input
              name='from'
              type='text'
              value={sum} 
              disabled
            />
          </Field>
          </div>
       
          <Field label='Print:' labelLeft>
            <Button onClick={() => printLayer('div-id-name')} fontSize='2em'  width='100px' label={<HiPrinter />}/>
        </Field>     
        </div>
 
      </div>
    </Page>
  )
}

export default FinancialReport;