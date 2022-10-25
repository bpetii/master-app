import React from 'react';
import {Drawer, List, Flex } from '@bpetii/uio-gui-library';

const SecretaryPage = () => {

  return (
    <>
      <Flex height={'100%'}>
          <div
            style={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div> Test</div>
          </div>
          <Drawer
            open
            width={350}
            closedWidth={50}
            button={true}
            right={false}
            border={true}
      >
        <div >
              <List list={{items: []}}/>
        </div>
        </Drawer>
     </Flex>
      </>
  )
}

export default SecretaryPage;