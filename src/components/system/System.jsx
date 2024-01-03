import HeaderContainer from '@components/common/containers/HeaderContainer'
import SystemTabMenuContainer from '@components/system/containers/SystemTabMenuContainer';
import Sidebar from '@components/common/Sidebar';

const System = () => {
    return (
      <>
        <HeaderContainer></HeaderContainer>
        <Sidebar></Sidebar>
        <SystemTabMenuContainer></SystemTabMenuContainer>
      </>
    );
  };
  
  export default System;