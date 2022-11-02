import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { Field, Input, Page, Card, TextArea, Text} from '@bpetii/uio-gui-library';
import { DayPicker } from 'react-day-picker';
import { format  } from 'date-fns';

const FinancialReport = () => {
 
  return (
    <Page left='70px' padding='0'>
        <Text>Report</Text>
    </Page>
  )
}

export default FinancialReport;