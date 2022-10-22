import React from 'react';
import { Spacer, Field, CustomSelect} from '@bpetii/uio-gui-library';
import './data-filter.css'
import {capitalize, omit} from 'lodash';
import {useTranslation} from 'react-i18next';

const FILTER_KEYS = ['city', 'expertise', 'name']

export const DataFilter = ({
  doctors,
  filters, 
  setFilters
}) => {
  const {t} = useTranslation();
  const getUniqueOptions = (key) => {
    return [...new Set(doctors.map(item => item[key]))].map(uniqueItem => ({value: uniqueItem, label:uniqueItem}));
  }

    return (
        <div className='listFilter'>
          <Spacer />
          {FILTER_KEYS.map(key => (
            <Field key={key} label={t(key)} labelWidth='95px' labelLeft>
              <CustomSelect 
                value={filters[key]}
                small
                onChange={ev => {
                  if (ev) {
                    setFilters({
                      ...filters,
                      [key]: {label: ev?.label, value: ev?.value}
                    })
                  } else {
                    setFilters({
                      ...omit(filters, key)
                    })
                  }
                  }}
                options={getUniqueOptions(key)}
                width= '200px'
              /> 
            </Field>
          ))}

        </div>
    )
}

