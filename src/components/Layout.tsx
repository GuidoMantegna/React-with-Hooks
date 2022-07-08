import React, { Fragment, ReactNode } from "react";
import { useState, useEffect } from "react";
import "./styles/Layout.css";
import { Header, Navbar, Footer } from "./index";
import NavMenu from "./NavMenu";
import Login from "./Login";
import { Center, VStack, Flex } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [userName, setUserName] = useState("Hi User!");
  const [status, setStatus] = useState("out");
  let hidden = true;

  // const showHideBurguerMenu = () => {
  //     const burguerMenu = document.querySelector('.burguer-menu');
  //     const burguerIcon = document.getElementById('burguer-icon');

  //     if (hidden) {
  //         burguerMenu.style.transform = 'translateY(60px)'
  //         burguerIcon.classList.replace('bi-list', 'bi-x-circle');
  //     } else {
  //         burguerMenu.style.transform = 'translateY(-100%)'
  //         burguerIcon.classList.replace('bi-x-circle', 'bi-list');
  //     }

  //     hidden = !hidden
  // };

  // const handleSideClicks = e => {
  //     const sideLinks = Array.from(document.querySelectorAll('.side-link'));

  //     sideLinks.forEach(link => {
  //         link !== e.target ? link.style.color = 'rgb(150, 150, 150)' : link.style.color = 'rgb(80, 80, 80)'
  //     })
  // };

  // const handleBurguerClicks = e => {
  //     showHideBurguerMenu()
  //     const burguerLinks = Array.from(document.querySelectorAll('.burguer-link'));

  //     if(e.target.id ==! "burguer-icon") {
  //         burguerLinks.forEach(link => {
  //             link !== e.target ? link.style.color = 'rgb(255, 255, 255)' : link.style.color = 'rgb(80, 80, 80)'
  //         })
  //     }

  // }

  // const handleLogClick = e => {
  //     const input = document.querySelector('.login-input');
  //     const className = e.target.classList;

  //     switch (status) {
  //         case "out":
  //             input.style.height = "30px";
  //             input.placeholder  = "enter your name";
  //             className.remove('btn-success');
  //             className.add('btn-warning');
  //             setStatus("almost");
  //             break;
  //         case "almost":
  //             if(input.value !== "") {
  //                 setUserName("Hi! " + input.value);
  //                 input.value = ""
  //                 className.remove('btn-warning');
  //                 className.add('btn-danger');
  //                 e.target.innerText = 'logout';
  //                 input.placeholder = "";
  //                 input.style.height = "0";
  //                 input.style.background = "rgb(220, 220, 220)"
  //                 setStatus("in");
  //             } else {
  //                 input.style.background = "rgba(212, 85, 85, .5)"
  //             }
  //             break;
  //         case "in":
  //             className.remove('btn-danger');
  //             className.add('btn-success');
  //             e.target.innerText = 'login';
  //             setUserName('Hi User!');
  //             setStatus("out");
  //             break;
  //     };
  // }

  return (
    <>
      <Center bg="gray.800" h="100vh" p={4}>
        <Flex
          p={{ md: "0 15%" }}
          bg="gray.100"
          direction="column"
          h="100%"
          w="100%"
          borderRadius={4}
        >
          <Flex p={2}>
            <Header />
          </Flex>
          <Flex>
            <Navbar />
          </Flex>
          <Flex p={2} grow={1}>
            {children}
          </Flex>
          <Flex p={4} justify="flex-end">
            <Footer />
          </Flex>
        </Flex>
      </Center>
    </>
  );
};

export default Layout;
