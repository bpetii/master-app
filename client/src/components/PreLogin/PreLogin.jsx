import React, { useState }  from 'react';
import {Flex, Icon, Button, Modal} from '@bpetii/uio-gui-library';
import { FaHospitalUser } from 'react-icons/fa';
import Register from '../Register/Register';
 import Login from '../Login/Login';

const PreLogin = () => {
  const [registerModalData, setRegisterModalData] = useState({visible: false, isSecretary: true});
  const [loginModalData, setLoginModalData] = useState({visible: false, isSecretary: true});

   return (
    <div style={{height: '100vh'}}>
    <Flex 
        gap="300px" 
        alignItems="center"
        height="100vh"
        justifyContent="center"
      >
          <Flex direction="column">
            <Icon icon={<FaHospitalUser />} size="200px"/>
            <Flex direction="column">
              <Button label="Login" onClick={()=> setLoginModalData({visible:true, isSecretary: true})} />
            </Flex>
          </Flex>
          
          <Flex direction="column">
            <Icon icon={<FaHospitalUser />} size="200px"/>
            <Flex direction="column">
              <Button label="Login" onClick={()=> setLoginModalData({visible:true, isSecretary: false})} />
              <Button label="Register" onClick={() => setRegisterModalData({visible:true, isSecretary:false})} />
            </Flex>
          </Flex>
        </Flex>
    <Modal visible={registerModalData.visible} centered>
      <Register isSecretary={registerModalData.isSecretary} closeModal={()=> setRegisterModalData({...registerModalData,visible: false})}/>
    </Modal>
    <Modal visible={loginModalData.visible} centered>
      <Login isSecretary={loginModalData.isSecretary} closeModal={()=> setLoginModalData({...loginModalData,visible: false})}/>
    </Modal>
    </div>
     
    ) 

}


export default PreLogin