import React from 'react';
import RegistrationForm from './RegisterForm';

const RegisterPage: React.FC = () => {
  const handleSubmit = (userData: any) => {
    // Here you can handle the submission, e.g., send the data to an API or perform other actions
    console.log('Submitted data:', userData);
    // Replace console.log with your logic for handling user registration
  };

  return (
    <div>
      <h2>Register</h2>
      <RegistrationForm onSubmit={handleSubmit} />
    </div>
  );
};

export default RegisterPage;
