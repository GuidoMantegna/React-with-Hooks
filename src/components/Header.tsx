// import React, {Fragment} from 'react';
// import './styles/Header.css';
// import Logo from '../images/avocado.png'

// const Header = () => {
//     return (
//         <>
//             <div className="header-container">
//                 <div className="logo-container">
//                     <img src={Logo} className="logo"/>
//                     <p className="logo-txt">FULL <br/><span>FR</span>IDGE</p>
//                 </div>
//                 <div className="title-container">
//                     <h1 className="header-title">Welcome to the biggest food<br/>market in the net.</h1>
//                 </div>
//             </div>
//         </>  
//     )
// };

// export default Header;

import * as React from 'react';
import { Flex, Box, Image, Heading } from '@chakra-ui/react';
import Logo from '../images/Logo.png';

interface HeaderProps {
}

const Header: React.FunctionComponent< HeaderProps> = (props) => {
  return (
      <>
        <Flex justify='space-between' w='100%' align='center'>
            <Box>
                <Image src={Logo} alt="logo" />
            </Box>
            <Box>
                <Heading as='h1'  fontSize={{ base: 'sm', xl: 'md' }} textAlign='right'>Welcome to the biggest food<br/>market in the net.</Heading>
            </Box>
        </Flex>
      </>
  );
};

export default Header;
