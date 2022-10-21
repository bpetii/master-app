import React from 'react';
import './schedule.css'

import DayTimePicker from '@mooncake-dev/react-day-time-picker';

const Schedule = (props) => {

  const handleScheduled = (dateTime) => {
    console.log(dateTime);
  }

  function timeSlotValidator(slotTime) {
    console.log(slotTime)
   /*  const doctorTime = new Date(
      slotTime.getFullYear(),
      slotTime.getMonth(),
      slotTime.getDate(),
      18,
      0,
      0
    ); */
    /* const isValid = slotTime.getTime() > eveningTime.getTime();  */
    return true;
  }

  return (
    <div className='container'>
      <DayTimePicker 
        timeSlotSizeMinutes={15} 
        onConfirm={handleScheduled}
        timeSlotValidator={timeSlotValidator}
       /*  confirmText='Your appointment has been scheduled with...' */
        isLoading={false}
        isDone={false}
    /*     isDone={true} */
      /*   err='There is something wrong!' */
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