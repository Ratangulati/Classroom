import React, { useState } from 'react';
import TeacherSignInContainer from './ui/Teacher/TeacherSignInContainer';
import FormContainer from './ui/Teacher/FormContainer';
import InputField from './ui/Teacher/InputField';
import SubmitButton from './ui/Teacher/SubmitButton';

const TeacherSignIn = () => {

  const [email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  
  const handleSignIn = () => {
    console.log('Teacher Sign In', [email, password]);
  }

  return (
   <TeacherSignInContainer>
    <h2>Teacher Sign In</h2>
    <FormContainer>
      <InputField type='email' placeholder='email' value={email}  onChange={(e) => setEmail(e.target.value)} required />
      <InputField type='password' placeholder='password' value={password}  onChange={(e) => setPassword(e.target.value)} required />
      <SubmitButton to="/teacher/dashboard" type='button'  onClick={handleSignIn} >Sign In</SubmitButton>
    </FormContainer>
   </TeacherSignInContainer>
  );
};

export default TeacherSignIn;