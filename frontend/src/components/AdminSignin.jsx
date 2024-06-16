import React, { useState } from 'react';
import FormContainer from './ui/Admin/FormContainer';
import InputField from './ui/Admin/InputField';
import SubmitButton from './ui/Admin/SubmitButton';
import AdminSignInContainer from './ui/Admin/AdminSignInContainer';


const AdminSignIn = () => {

  const [email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  
  const handleSignIn = () => {
    console.log('Admin Sign In', [email, password]);
  }


  return (
   <AdminSignInContainer>
    <h2>Admin Sign In</h2>
    <FormContainer>
      <InputField type='email' placeholder='email' value={email}  onChange={(e) => setEmail(e.target.value)} required />
      <InputField type='password' placeholder='password' value={password}  onChange={(e) => setPassword(e.target.value)} required />
      <SubmitButton to="/admin/dashboard" type='button'  onClick={handleSignIn} >Sign In</SubmitButton>
    </FormContainer>
   </AdminSignInContainer>
  );
};

export default AdminSignIn;
