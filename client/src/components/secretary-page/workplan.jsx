import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { Field, Input, Page, Card, TextArea, Button} from '@bpetii/uio-gui-library';
import { DayPicker } from 'react-day-picker';
import { format  } from 'date-fns';
import { CustomDayPicker } from '../day-picker/day-picker';


const getWorkPlan = (userid, access_token, datetime) => {
  return fetch("http://localhost:4000/api/workplan?" + new URLSearchParams({ secretaryid: userid, datetime: datetime.toISOString()}),{
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': access_token
    }
  }).then(res => res?.json())
}

const Workplan = () => {
  const {user, access_token} = useSelector(state => state.user);
  const [workplan, setWorkplan] = useState([]);
  const [datetime, setDatetime] = useState(new Date());
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("");
  const [number, setNumber] = useState("");
  const [comments, setComments] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleDaySelected = (date) => {
    //TODO manipulate the date 
    setDatetime(date)
  }
  console.log(workplan)
  useEffect(() => {
    async function fetchData() {
      const plans = await getWorkPlan(user.id,access_token, datetime);
      setWorkplan(plans);
    }

    fetchData();
  }, []);

  const onSave = () => {
    return fetch("http://localhost:4000/api/workplan",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': access_token
      },
      body: JSON.stringify({
        secretaryid: user.id,
        datetime,
        from,
        to,
        number,
        comments
      })
    }).then(() => {
      setIsSaved(true);
    })
  }

  return (
    <Page left='70px' padding='0'>
      <div style={{display: 'grid', gridTemplateColumns: '500px 1fr', gap: '2rem', margin: 'auto 100px'}}>
          <CustomDayPicker
            mode="single"
            value={datetime}
            onSelect={handleDaySelected}
        />
        <Card heading={<h3>{format(datetime, 'PP')}</h3>}>
          <Field label="From">
              <Input
              name='from'
              type='text'
              onChange={(evt) => {
                setFrom(evt.target.value);
              }}
              value={from} />
          </Field>
          <Field label="To">
              <Input
              name='to'
              type='text'
              onChange={(evt) => {
                setTo(evt.target.value);
              } }
              value={to} />
          </Field>
          <Field label="Number">
              <Input
              name='number'
              type='text'
              onChange={(evt) => {
                setNumber(evt.target.value);
              } }
              value={number} />
          </Field>
          <Field label="Comments">
              <TextArea
              name='number'
              type='text'
              onChange={(evt) => {
                setComments(evt.target.value);
              } }
              value={comments} />
          </Field>
          <Button label="Save" onClick={onSave} disabled={isSaved}/>
        </Card>
      </div>
    </Page>
  )
}

export default Workplan;