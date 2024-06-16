import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './ui/Home/Navbar';
import NavigationLinks from './ui/Home/NavigationLinks';
import ButtonsContainer from './ui/Home/ButtonsContainer';
import LoginButton from './ui/Home/LoginButton';
import GuestButton from './ui/Home/GuestButton';
import NavLink from './ui/Home/Navlink';
import HomeContainer from './ui/Home/HomeContainer';
import SchoolInfo from './ui/Home/SchoolInfo';
import Title from './ui/Home/Title';
import AdminRegisterLink from './ui/Home/AdminRegisterLink';


const Home = () => {
    const navigate = useNavigate();

    const handleLoginCLick = () => {
        navigate('./choose-user')
    }

    return (
    <>
        <Navbar>
            <NavigationLinks>
                <NavLink href ='#'> About US </NavLink>
                <NavLink href ='#'> Products </NavLink>
                <NavLink href ='#'> Contact US </NavLink>
            </NavigationLinks>
            <ButtonsContainer>
                <LoginButton onClick={handleLoginCLick}>Sign In</LoginButton>
                <GuestButton onClick={handleLoginCLick}>Guest Mode</GuestButton>
            </ButtonsContainer>
        </Navbar>
        <HomeContainer>
            <SchoolInfo>
                <Title>school</Title>
                <AdminRegisterLink>Admin Register</AdminRegisterLink>
            </SchoolInfo>
        </HomeContainer>
    </>
        
    )
}

export default Home;