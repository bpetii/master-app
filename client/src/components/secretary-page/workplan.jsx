import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { Field, Input, Page, Card, TextArea, Button} from '@bpetii/uio-gui-library';
import { DayPicker } from 'react-day-picker';
import { format  } from 'date-fns';
import { toast } from 'react-toastify';
import TimePicker from 'react-time-picker';
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
  const {showInfo} = useSelector(state => state.ui);
  const {user, access_token} = useSelector(state => state.user);
  const [datetime, setDatetime] = useState(new Date());
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("");
  const [number, setNumber] = useState("");
  const [comments, setComments] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const resetData = () => {
    setFrom("")
    setTo("")
    setNumber('')
    setComments('')
  }
  const handleDaySelected = (date) => {
    //TODO manipulate the date 
    setDatetime(date)
  }
  useEffect(() => {
    async function fetchData() {
      const plans = await getWorkPlan(user.id,access_token, datetime);
      if (plans) {
        setFrom(plans.from)
        setTo(plans.to)
        setNumber(plans.number)
        setComments(plans.comments)
        setIsSaved(true)
      } else {
        resetData();
        setIsSaved(false)
      }
    }
    fetchData();
  }, [datetime]);

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
        toast.success('Successfully saved!')
    })
  }

  return (
    <Page left='70px' padding='0'>
      <div style={{display: 'grid', gridTemplateColumns: '500px 1fr', gap: '2rem', margin: 'auto 100px'}}>
          <CustomDayPicker
            mode="single"
            value={datetime}
            onSelect={handleDaySelected}
            info={showInfo && ['Use the calendar to choose the day or month and see the workplan for that specifc day']}
        />
        <Card heading={<h3>{format(datetime, 'PP')}</h3>} info={showInfo && ['Fill out the required information and press Save button to store the workplan', 'If you need to edit the workplan press Edit button, change the information and press Save to apply changes']}>
          <Field label="From">
          <input type='time' 
            onChange={(evt) => setFrom(evt.target.value)} 
            value={from} />
          </Field>
          <Field label="To">
          <input type='time' 
            onChange={(evt) => setTo(evt.target.value)} 
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