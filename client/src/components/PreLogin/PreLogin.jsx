import React, { useState }  from 'react';
import {Flex, Icon, Button, Modal, Page} from '@bpetii/uio-gui-library';
import { FaHospitalUser } from 'react-icons/fa';
import {FaUserMd} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Register from '../Register/Register';
 import Login from '../Login/Login';
import { useEffect } from 'react';
import { loadDoctors } from '../../store/slices/doctorsSlice';
import { useDispatch, useSelector } from 'react-redux';

const PreLogin = () => {
  const {t} = useTranslation();
  const {user, isDarkMode} = useSelector(state => state.user)
  const [registerModalData, setRegisterModalData] = useState({visible: false, isSecretary: true});
  const [loginModalData, setLoginModalData] = useState({visible: false, isSecretary: true});
  const dispatch = useDispatch();

  useEffect(()=> {
    if (!user) return;
    dispatch(loadDoctors())
  }, [user])

   return (
    <Page left='0'>
      <h1 style={{textAlign: 'center', fontSize:'3rem', color: 'var(--color-text)'}}>Secretary Management Application</h1>
      <Flex 
          gap="300px" 
          alignItems="center"
          height="100vh"
          justifyContent="center"
        >
          <div style={{border: '5px solid var(--color-text)', padding: '30px', paddingBottom: '57px',  paddingTop: '95px', borderRadius: '20px'}}>
          <Flex direction="column">
            <div style={{marginBottom: '20px', textAlign: 'center'}}>
              <Icon icon={<FaUserMd />} size="250px"/>
            </div>
              <Flex direction="column">
                <Button fontSize='1.5rem' colored={!isDarkMode} width='300px' label={t("login")} onClick={()=> setLoginModalData({visible:true, isSecretary: true})} />
              </Flex>
            </Flex>
          </div>
         
          <div style={{border: '5px solid var(--color-text)', padding: '30px', borderRadius: '20px'}}>
            <Flex direction="column">
            <div style={{marginTop: '15px', }}>
              <Icon icon={<FaHospitalUser />} size="300px"/>
            </div>
              <Flex direction="column" gap='10px'>
                <Button fontSize='1.5rem' colored={!isDarkMode} label={t("login")} onClick={()=> setLoginModalData({visible:true, isSecretary: false})} />
                <Button fontSize='1.5rem' colored={!isDarkMode} label={t("register")} onClick={() => setRegisterModalData({visible:true, isSecretary:false})} />
              </Flex>
            </Flex>
          </div>
          </Flex>
      <Modal visible={registerModalData.visible} centered>
        <Register isSecretary={registerModalData.isSecretary} closeModal={()=> setRegisterModalData({...registerModalData,visible: false})}/>
      </Modal>
      <Modal visible={loginModalData.visible} centered>
        <Login isSecretary={loginModalData.isSecretary} closeModal={()=> setLoginModalData({...loginModalData,visible: false})}/>
      </Modal>
    </Page>  
    ) 
}

export default PreLogin
