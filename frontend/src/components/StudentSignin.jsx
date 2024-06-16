import React, { useState } from 'react';
import StudentSignInContainer from './ui/Student/StudentSignInContainer';
import FormContainer from './ui/Student/FormContainer';
import InputField from './ui/Student/InputField';
import SubmitButton from './ui/Student/SubmitButton';

const StudentSignIn = () => {

  const [email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  
  const handleSignIn = () => {
    console.log('Student Sign In', [email, password]);
  }

  return (
   <StudentSignInContainer>
    <h2>Student Sign In</h2>
    <FormContainer>
      <InputField type='email' placeholder='email' value={email}  onChange={(e) => setEmail(e.target.value)} required />
      <InputField type='password' placeholder='password' value={password}  onChange={(e) => setPassword(e.target.value)} required />
      <SubmitButton to="/student/dashboard" type='button'  onClick={handleSignIn} >Sign In</SubmitButton>
    </FormContainer>
   </StudentSignInContainer>
  );
};

export default StudentSignIn;