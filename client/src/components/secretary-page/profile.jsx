import React, {useState, useEffect} from 'react';
import { List, Page, Field, Input, Flex, Table, Divider, Button, Label, Spacer, Tooltip, Modal, Dialog} from '@bpetii/uio-gui-library';
import {MdDeleteForever} from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteUser } from '../../store/slices/userSlice';
import { format } from 'date-fns';

const headers=[{
  cells: [
    {
      value: 'Doctor Name'
    },
    {
      value: 'Appointment Date'
    }]
  }];

const getPatients = (access_token) => {
  return fetch("http://localhost:4000/api/users/patients",{
    headers: {
      'x-auth-token': access_token
    },
    method: 'GET',
  })
  .then(res => res.json())
}

const getHistory = (userid, access_token) => {
  return fetch("http://localhost:4000/api/users/history?" + new URLSearchParams({userid}),{
    headers: {
      'x-auth-token': access_token
    },
    method: 'GET',
  })
  .then(res => res.json())
}

const Profile = () => {
  const {access_token} = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const {showInfo} = useSelector(state => state.ui);
  const [patients, setPatiens] = useState([]);
  const [history, setHistory] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [filterName, setFilterName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [filterId, setFilterId] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [zipValue, setZipValue] = useState('');

  const handleEdit= () => {
    setIsEditing(prev=> !prev);
    if (isEditing) {
      toast.success('Successfully saved!')
    }
  }

  const removePatient = () => {
    if (selectedPatient) {
      setShowDeleteModal(true)
    }

  }

  const handleDeletePatient = async () => {
    const isDeleted = await dispatch(deleteUser(selectedPatient.id))

    if (isDeleted) {
      setPatiens(patients.filter(patient=> patient.id !== selectedPatient.id))
      toast.success(`Successfully deleted ${selectedPatient.name}!`)
      setSelectedPatient(null)
      setHistory([])
      setShowDeleteModal(false)
    } else {
      toast.error(`Something went wrong`)
      setShowDeleteModal(false)
    }
  };

  useEffect(() =>  {
    async function fetchData() {
      const patients = await getPatients(access_token);
      setPatiens(patients);
    }
    fetchData();
   }, [access_token])

  useEffect(() => {
    if (!selectedPatient) return;
    async function fetchData() {
      const history = await getHistory(selectedPatient.id,access_token);
      setHistory(history);
    }
    fetchData();
    setZipValue(selectedPatient?.zip)
  }, [selectedPatient])

  const patientsFiltered = () => {
    let newList = [...patients];
   /*  Object.keys(filters).map(filterKey => newList = newList.filter(item => item[filterKey] === filters[filterKey].value)) */
    return {
      items: newList.filter(p => p.name.toLowerCase().includes(filterName.toLowerCase()))
      .filter(p => p.id.toLowerCase().includes(filterId.toLocaleLowerCase()))
      .map((patient) => ({
        id: patient.id,
        name: patient.name,
        onClick: () => setSelectedPatient(patient),
        active: selectedPatient?.id === patient.id,
        ...patient
      }))}
  };

  const rows = history.map(h => ({
    cells:[{value: h.doctorname}, {value: h.datetime}]
  }))

  const filteredPatients = patientsFiltered();

  //React responsive stuff for mobile (hook)
  //css module @media

  return (
    <Page left='70px' padding='20px'>
      <div style={{display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem'}}>
        <div >
        <Label label='Patient profile' info={showInfo && ['To view patients profile use the filters (Name, Personal Identity Number) to find the patient you are looking for']}/>
        <Spacer />
          <Field label='Patient name' labelWidth='100px' labelLeft>
            <Input value={filterName} onChange={e => setFilterName(e.target.value)}/> 
          </Field> 
          <Field label='Patient ID' labelWidth='100px' labelLeft>
          <Input value={filterId} onChange={e => setFilterId(e.target.value)}/> 
          </Field>  
          <List bordered list={ filteredPatients} />        
        </div>
          <div>
          <Label label='View and edit patient information' info={showInfo && ['Patients information can be viewed in the textbox.', 'To edit the information press the Edit button to enable editing', 'then press Save button to apply the changes']}/>
          <Spacer />
            <div style={{display: 'grid', justifyContent: 'space-between', gridTemplateColumns:'0.5fr 0.5fr', columnGap: '30px'}}>
              <Field label='Patient id'>
                <Input value={selectedPatient?.id} disabled={!isEditing}/>
              </Field>
              <Field label='Patient Name'>
                <Input value={selectedPatient?.name} disabled={!isEditing}/>
              </Field>
              <Field label='Patient Email' >
                <Input value={selectedPatient?.email} disabled={!isEditing}/>
              </Field> 
              <Field label='Address'>
                <Input value={selectedPatient?.address} disabled={!isEditing}/>
              </Field>
              <Field label='City'>
                <Input value={selectedPatient?.city} disabled={!isEditing}/>
              </Field>
              <Field label='Zip' >
                <Input value={zipValue} disabled={!isEditing}  onChange={e => setZipValue(e.target.value)}/>
              </Field>   
            </div>
            <Flex gap='30px'>
              <Button disabled={!selectedPatient} label={isEditing? 'Save' : 'Edit'} fontSize='1.1rem' width='100px' onClick={handleEdit}/>
              <Tooltip text='Delete'>
                <Button disabled={!selectedPatient} label={<MdDeleteForever />} fontSize='1.4rem' width='100px' onClick={()=> removePatient()}/> 
              </Tooltip>

            </Flex>

            <Divider />
            <Label label='Appointments history' info={showInfo && ['The table below shows the appointments history of the selected patient. You cannot edit it.']}/>
            <Spacer />
            <Table table={{headers, rows}} />
        </div>
      </div>
      <Modal visible={showDeleteModal} centered>
        <Dialog
          dialog={{
            width: '500px',
            heading: 'Are you sure?',
            content: `Are you sure you want to delete ${selectedPatient?.name}`,
            footer: ( 
            <>
            <Button active label ='Yes' onClick={handleDeletePatient} />
            <Button onClick={() => setShowDeleteModal(false)} label='No'/>
            </>
            ),
            onClose: () => setShowDeleteModal(false),
          }}
        >
        </Dialog>
      </Modal>
      
    </Page>
  )
}

export default Profile;