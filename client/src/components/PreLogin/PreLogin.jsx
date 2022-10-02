import React  from 'react';
import { useNavigate } from "react-router";
import {Flex, Icon, Button} from '@bpetii/uio-gui-library';
import { FaHospitalUser, FaHospitalAlt } from 'react-icons/fa';

const PreLogin = () => {
  
  const navigate = useNavigate();

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
              <Button label="Login" onClick={()=> navigate('/login/1')} />
              <Button label="Register" onClick={()=> navigate('/register/1')} />
            </Flex>
          </Flex>
          
          <Flex direction="column">
            <Icon icon={<FaHospitalUser />} size="200px"/>
            <Flex direction="column">
              <Button label="Login" onClick={()=> navigate('/login/0')} />
              <Button label="Register" onClick={()=> navigate('/register/0')} />
            </Flex>
          </Flex>
          
        </Flex>
    </div>
     
    ) 

}


export default PreLogin