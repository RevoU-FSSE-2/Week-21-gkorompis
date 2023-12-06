import React from 'react';

interface Profile {
  name: string;
  username: string;
  email: string;
  role: string;
}

const ProfilePage: React.FC = () => {
  // Dummy profile data
  const dummyProfiles: Profile[] = [
    {
      name: 'John Doe',
      username: 'johndoe123',
      email: 'john@example.com',
      role: 'User',
    },
    {
      name: 'Jane Smith',
      username: 'janesmith456',
      email: 'jane@example.com',
      role: 'Admin',
    },
    // Add more dummy profiles as needed
  ];

  return (
    <div>
      <h1>Profile Page</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {dummyProfiles.map((profile, index) => (
            <tr key={index}>
              <td>{profile.name}</td>
              <td>{profile.username}</td>
              <td>{profile.email}</td>
              <td>{profile.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfilePage;
