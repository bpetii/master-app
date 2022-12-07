import React from 'react';
import { DayPicker } from 'react-day-picker';
import { Card} from '@bpetii/uio-gui-library';
import { format } from 'date-fns';
import './day-picker.css';
import {faIR, enUS} from 'date-fns/locale';
import i18next from 'i18next';


export const CustomDayPicker =({value, onSelect, info, mode='single'}) => {
    const {language} = i18next;
    const singleFooter = (mode === 'single' && value? <p>You picked {format(value, 'PP')}.</p> : <p>Please pick a day.</p>);
    const rangeFotter = ( 
        value?.from ? 
            !value.to? <p>First day: {format(value.from, 'PPP')}. Please pick the second day</p> 
            : 
            value.to && <p> {format(value.from, 'PP')} – {format(value.to, 'PP')}</p> 
        : 
        <p>Please pick the first day.</p>)

  
    const onChange =(date) => {
        if (mode === 'single') {
          if (!date) return;
          const userTimezoneOffset = date.getTimezoneOffset() * 60000;
          const normalizedDate= new Date(date.getTime() - userTimezoneOffset);
          onSelect(normalizedDate);
        } else {
          if (date && date.from) {
            const userTimezoneOffset = date.from.getTimezoneOffset() * 60000;
            const normalizedRange={
              from: new Date(date?.from.getTime() - userTimezoneOffset),
              to: date.to && new Date(date?.to.getTime() - userTimezoneOffset)
            }
            onSelect({...normalizedRange});
          } else {
            onSelect(date);
          }
        }
       
    }
    return(
      <Card border heading={<h3> Calendar</h3>} info={info}>
         <DayPicker
          mode={mode}
          selected={value}
          onSelect={onChange}
          modifiersClassNames={{
            selected: 'my-selected',
            today: 'my-today'
          }}
          locale={language === 'fa' ? faIR : enUS}
          dir= {language === 'fa' ?'rtl' : ''}
          footer={mode === 'single'? singleFooter : rangeFotter}
        />
      </Card>
    )
  
}

  