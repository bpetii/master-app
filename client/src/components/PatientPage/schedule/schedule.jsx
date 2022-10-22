import React from 'react';
import './schedule.css'
import { useDispatch, useSelector } from 'react-redux';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import { createAppointments } from '../../../store/slices/appointmentsSlice';
import {useTranslation} from 'react-i18next';

const SLOT_MINUTES = 15;

const Schedule = ({userid, doctorid}) => {
  const {t} = useTranslation();
  const {loading, error, done} = useSelector(state => state.appointments)
  const {selectedDoctor} = useSelector(state => state.doctors)
  const dispatch = useDispatch();

  const handleScheduled = (datetime) => {
    const payload = {
      datetime,
      userid,
      doctorid
    }
    dispatch(createAppointments(payload))
  }

  function timeSlotValidator(slotTime) {
    const {from, to} = selectedDoctor;

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

  return (
    <div className='container'>
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