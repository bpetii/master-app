import React from 'react';
import './schedule.css'
import { useDispatch, useSelector } from 'react-redux';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import { createAppointments } from '../../../store/slices/appointmentsSlice';

const Schedule = ({userid, doctorid}) => {
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
    console.log(slotTime.getHours())
    return true;
  }

  return (
    <div className='container'>
      <DayTimePicker 
        timeSlotSizeMinutes={15} 
        onConfirm={handleScheduled}
        timeSlotValidator={timeSlotValidator}
        isLoading={loading}
        err={error}
        doneText={`You scheduled an appointment with ${selectedDoctor.name}`}
        isDone={!error && done}
        
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