import React, {useState, useEffect} from 'react';
import { Button, Spacer, Page, Card, Field } from '@bpetii/uio-gui-library';
import {HiPrinter} from 'react-icons/hi'
import Schedule from '../PatientPage/schedule/schedule';
import { useSelector } from 'react-redux';
import { DayPicker } from 'react-day-picker';
import { format, formatRelative  } from 'date-fns';
import 'react-day-picker/dist/style.css';
import i18n from 'i18next';
import './style.css'
import { CustomDayPicker } from '../day-picker/day-picker';


const Invoice = () => {
    const {showInfo} = useSelector(state => state.ui);
    const [name, setName] = useState('');
    const [identity, setIdentity] = useState('');
    const [date, setDate] = useState('');
    const [money, setMoney] = useState('');
    const [signature, setSignature] = useState('');

    function formatDate() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

  return (
    <Page left='70px' padding='0'>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection:'column'}}>
                <Card heading={<h3>Invoice</h3> }id="div-id-name" info={showInfo && ['Fill out the required information and press the print button to issue an invoice.', 'You will see a preview of your invoice. To print it on paper press the print button again']}>
                <div id='div-id-name'>
                    <div>Hereby it is confirmed that Mr/Ms<input className='nameInput' value={name} onChange={(e) => setName(e.target.value)} /> holder of the personal identity number <input className='nameInput' value={identity} onChange={(e) => setIdentity(e.target.value)} /></div>
                    <div>Has visited the office on <input className='nameInput' type='date' style={{width: '130px'}} value={date} onChange={(e) => setDate(e.target.value)}/> and paid $<input className='nameInput' style={{width: '50px'}} value={money} onChange={(e) => setMoney(e.target.value)}/> for the vitising fee and further services.</div>
                    <Spacer height='80px'/>
                        <Field label='Issue date: ' labelLeft>
                            {formatDate()}
                        </Field>
                    <Spacer/>
                        <Field label='Signature: ' labelLeft>
                            <input className='nameInput'value={signature} onChange={(e) => setSignature(e.target.value)} />
                        </Field>
                    </div>
                    <div style={{float: 'right', margin:'10px'}}>
                        <Field label='Print:' labelLeft>
                            <Button onClick={() => printLayer('div-id-name')} fontSize='2em' label={<HiPrinter />} width='100px'/>
                        </Field>         
                    </div>
                </Card>

        </div>
    </Page>
  )
}

export default Invoice;