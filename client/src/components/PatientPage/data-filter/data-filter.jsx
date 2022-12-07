import React from 'react';
import {useSelector} from 'react-redux'
import { Spacer, Field, CustomSelect, Label} from '@bpetii/uio-gui-library';
import './data-filter.css'
import {capitalize, omit} from 'lodash';
import {useTranslation} from 'react-i18next';

const FILTER_KEYS = ['city', 'expertise', 'name']

export const DataFilter = ({
  doctors,
  filters, 
  setFilters
}) => {
  const {showInfo} = useSelector(state => state.ui);
  const {t} = useTranslation();
  const getUniqueOptions = (key) => {
    return [...new Set(doctors.map(item => item[key]))].map(uniqueItem => ({value: uniqueItem, label:uniqueItem}));
  }

    return (
        <div className='listFilter'>
          <Spacer />
          <Label label={t("filterOptions")} info={showInfo && ['Use the filters (City, Expertise, Name) to find the doctor you would like to meet.', 
            'Then click on the name of the doctor to see the calendar and the available appointments']} />
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
                width= '300px'
              /> 
            </Field>
          ))}

        </div>
    )
}

