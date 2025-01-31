import React, { useState } from 'react';
import './Login.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginHeader from './LoginHeader';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [stateId, setStateId] = useState(''); 
  const [role, setRole] = useState(''); // Role state added
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginRequest = {
      username: username,
      password: password,
      stateId: role === 'Dealer' ? stateId : '', // Only include stateId for Dealers
      role: role, // Include role in the request body
    };

    try {
      const response = await axios.post('http://localhost:8096/auth/login', loginRequest, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Save JWT and stateId after login success
      if (response.data.jwtToken) {

        if(role==='Admin'){
          localStorage.setItem('jwtToken', response.data.jwtToken);
         navigate('/adminpage');
        }
     else{
        localStorage.setItem('jwtToken', response.data.jwtToken);
        localStorage.setItem('stateId', role === 'Dealer' ? stateId : ''); // Save stateId only for Dealers
        setError('');
        
        navigate('/home'); // Navigate to the Home Page on success
      }
      } else {
        setError('Invalid username, password, or role');
      }
    } catch (error) {
      setError('Invalid username, password, or role'); // Handle error
    }
  };

  return (
    <>
      {/* Navbar */}
      <LoginHeader/>

      {/* Form */}
      <div className="form-bg">
        <div className="form-container">
          <div className="form-icon">
            <i className="fa fa-user">
              <img src="/TVS Motor Company.png" alt="Logo" style={{ width: '110px', height: '100px' }} />
            </i>
          </div>
          <h3 className="title">Dealer Login</h3>
          <form className="form-horizontal" onSubmit={handleLogin}>
            <div className="form-group">
               {/* Role dropdown */}
              <select
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="" disabled>Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Dealer">Dealer</option>
              </select>
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {role === 'Dealer' && ( // Conditionally render stateId field for Dealers only
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="State ID"
                  value={stateId}
                  onChange={(e) => setStateId(e.target.value)}
                  required={role === 'Dealer'}
                />
              </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="btn btn-default">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
