import React from 'react';
import './schedule.css'
import { useDispatch, useSelector } from 'react-redux';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import { createAppointments } from '../../../store/slices/appointmentsSlice';
import {useTranslation} from 'react-i18next';
import {Card} from '@bpetii/uio-gui-library';
import { darkTheme } from './dark-theme';

const SLOT_MINUTES = 15;

const Schedule = ({userid, doctorid}) => {
  const {t} = useTranslation();
  const {loading, error, done} = useSelector(state => state.appointments)
  const {doctors} = useSelector(state => state.doctors)
  const {isDarkMode} = useSelector(state => state.user);

  const selectedDoctor = doctors.find(doctor => doctorid === doctor.id)
  const dispatch = useDispatch();

  const handleScheduled = (datetime) => {
    const payload = {
      datetime,
      userid,
      doctorid
    }
    dispatch(createAppointments(payload))
  }

  const formatAppoinmentDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }

    console.log(year+'-' + month + '-'+dt, date.getHours(), date.getMinutes());
  }

  function timeSlotValidator(slotTime) {
    const {from, to, appointments} = selectedDoctor;
    
    formatAppoinmentDate(appointments[0]);
    const [fromHour, fromMinute] = from.split(':');
    const [toHour, toMinute] = to.split(':');

    const fromTotalMinutes = (+fromHour * 60) + +fromMinute;
    const toTotalMinutes = (+toHour * 60) + +toMinute;
    const slotTotalMinutes = (+slotTime.getHours() * 60) + +slotTime.getMinutes();

    if (fromTotalMinutes <= slotTotalMinutes && toTotalMinutes >= slotTotalMinutes + SLOT_MINUTES) {
      return true;
    }
    return false;
  }

  const ThemeWrapper = () => {
    if(isDarkMode) {
      return (
        <div className='dark'>
          <DayTimePicker 
            timeSlotSizeMinutes={SLOT_MINUTES} 
            onConfirm={handleScheduled}
            timeSlotValidator={timeSlotValidator}
            isLoading={loading}
            loadingText={t("loading")}
            err={error}
            doneText={t("doneText", {name: selectedDoctor.name})}
            isDone={!error && done}
            confirmText={t("schedule")}
            theme={darkTheme}
          />
        </div>);
    } else {
      return(
      <div className='light'>
      <DayTimePicker 
        timeSlotSizeMinutes={SLOT_MINUTES} 
        onConfirm={handleScheduled}
        timeSlotValidator={timeSlotValidator}
        isLoading={loading}
        loadingText={t("loading")}
        err={error}
        doneText={t("doneText", {name: selectedDoctor.name})}
        isDone={!error && done}
        confirmText={t("schedule")}
      />
    </div>);
    }
  
  }

  return (
    <Card margin='0' padding='false' info={
        <ol>
          <li>Select the doctor you would like to visit from the list of doctors on the left</li>
          <li>Select the date you prefer from the available dates on the calendar</li>
          <li>Select the time you prefer from the available times on the schedules</li>
          <li>If you changed your mind, press "Go Back" button to select another date or time</li>
          <li>Press "Schedule" button to finalize your appointment</li>
        </ol>
      }
      heading={<h3>Schedule</h3>}
      > {ThemeWrapper()}
    </Card>
   
  )
  
 
}

export default Schedule;


//dark mode:
/*   const theme = {
    primary: 'gold',
    secondary: 'slategrey',
    background: '#111', // This should match the container background
    buttons: {
      disabled: {
        color: '#333',
        background: '#f0f0f0'
      },
      confirm: {
        color: '#fff',
        background: 'slategrey',
        hover: {
          color: '',
          background: 'lightslategrey'
        }
      }
    },
    feedback: {
      success: {
        color: '#29aba4'
      },
      failed: {
        color: '#eb7260'
      }
    }
  }; */