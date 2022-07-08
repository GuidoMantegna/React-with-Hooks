// import { Fragment } from 'react';
// import { Link } from 'react-router-dom';
// import './styles/NavMenu.css';

// function NavMenu ( { containerClass, linkClass, onClick, children } ) {

//     return (
//         <Fragment>
//             <div className={containerClass}>

//                 {children}

//                 <div className="nav-links-container">
//                     <Link to="/home" onClick={onClick} className="link">
//                         <p className={linkClass} > <i className="bi bi-house-fill ico-link"></i> HOME </p>
//                     </Link>
//                     <Link to="/fridge" onClick={onClick} className="link">
//                         <p className={linkClass} > <i className="bi bi-door-closed ico-link"></i> MY FRIDGE </p>
//                     </Link>
//                     <Link to="/market" onClick={onClick} className="link">
//                         <p className={linkClass} > <i className="bi bi-shop ico-link"></i> THE MARKET </p>
//                     </Link>
//                     <Link to="/tips" onClick={onClick} className="link">
//                         <p className={linkClass} > <i className="bi bi-journal-bookmark ico-link"></i> FOOD TIPS </p>
//                     </Link>
//                     <Link to="/contact" onClick={onClick} className="link">
//                         <p className={linkClass} > <i className="bi bi-envelope ico-link"></i>CONTACT US </p>
//                     </Link>
//                 </div>

//             </div>
//         </Fragment>
//     )
// };

// export default NavMenu;

import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { HStack, StackDivider, Link, useMediaQuery } from "@chakra-ui/react";

interface NavMenuProps {}

const NavMenu: React.FunctionComponent<NavMenuProps> = (props) => {
  const [isLarge] = useMediaQuery("(min-width: 540px)");

  return (
    <>
      {isLarge && (
        <HStack
          divider={<StackDivider borderColor="gray.300" />}
        >
          <Link as={RouterLink} to="/home">
            Home
          </Link>
          <Link as={RouterLink} to="/fridge">
            Fridge
          </Link>
          <Link as={RouterLink} to="/tips">
            Tips
          </Link>
        </HStack>
      )}
    </>
  );
};

export default NavMenu;
