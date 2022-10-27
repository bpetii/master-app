import React, { useState }  from 'react';
import {Flex, Icon, Button, Modal, Page} from '@bpetii/uio-gui-library';
import { FaHospitalUser } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Register from '../Register/Register';
 import Login from '../Login/Login';
import { useEffect } from 'react';
import { loadDoctors } from '../../store/slices/doctorsSlice';
import { useDispatch, useSelector } from 'react-redux';

const PreLogin = () => {
  const {t} = useTranslation();
  const {user} = useSelector(state => state.user)
  const [registerModalData, setRegisterModalData] = useState({visible: false, isSecretary: true});
  const [loginModalData, setLoginModalData] = useState({visible: false, isSecretary: true});
  const dispatch = useDispatch();

  useEffect(()=> {
    if (!user) return;
    dispatch(loadDoctors())
  }, [user])

   return (
    <Page left='0'>
      <Flex 
          gap="300px" 
          alignItems="center"
          height="100vh"
          justifyContent="center"
        >
            <Flex direction="column">
              <Icon icon={<FaHospitalUser />} size="200px"/>
              <Flex direction="column">
                <Button label={t("login")} onClick={()=> setLoginModalData({visible:true, isSecretary: true})} />
              </Flex>
            </Flex>
            
            <Flex direction="column">
              <Icon icon={<FaHospitalUser />} size="200px"/>
              <Flex direction="column"  gap='10px'>
                <Button label={t("login")} onClick={()=> setLoginModalData({visible:true, isSecretary: false})} />
                <Button label={t("register")} onClick={() => setRegisterModalData({visible:true, isSecretary:false})} />
              </Flex>
            </Flex>
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