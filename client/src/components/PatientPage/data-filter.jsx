import React from 'react';
import { Spacer, Field, CustomSelect, Divider} from '@bpetii/uio-gui-library';
import './patient-page.css'

export const DataFilter = () => {

    return (
        <div className='listFilter'>
          <Spacer />
          <Field label="City" labelWidth='95px' labelLeft>
            <CustomSelect 
              value=''
              small
              onChange={o => {}}
              options={[]}
              width= '200px'
            /> 
          </Field>
          <Field label="Name" labelWidth='95px' labelLeft>
            <CustomSelect 
              value=''
              small
              onChange={o => {}}
              options={[]}
              width= '200px'
           /> 
          </Field>
        </div>
    )
}

