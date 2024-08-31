import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaDoorOpen } from 'react-icons/fa';
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
} from '@mui/material';

function App() {
  const [deviceLogId, setDeviceLogId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [branchName, setBranchName] = useState('');
  const [deviceLogType, setDeviceLogType] = useState('');

  // Function to generate a 6-digit random number
  const generateDeviceLogId = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  // Set the Device Log ID when the component mounts
  useEffect(() => {
    const generatedId = generateDeviceLogId();
    setDeviceLogId(generatedId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      deviceLogId: parseInt(deviceLogId),
      cardNumber,
      deviceLogType: parseInt(deviceLogType),
    };
  
    try {
      const res = await axios.post(`http://localhost:5000/api/device-logs/branch/${branchName}/access`, data);
  
      if (res.status === 200) {
        if (data.deviceLogType === 3) {
          Swal.fire({
            icon: 'success',
            title: 'Door Push Successful',
            text: 'Door opened successfully via push button.',
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Access Granted',
            text: res.data.message,
          });
        }
  
        // Clear specific fields after successful submission
        setCardNumber('');
        setDeviceLogType('');
        setBranchName('');
        const generatedId = generateDeviceLogId();
        setDeviceLogId(generatedId); // Generate a new ID for the next submission
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'User not found.',
          });
        } else if (error.response.status === 403) {
          Swal.fire({
            icon: 'error',
            title: 'Access Denied',
            text: 'Membership expired.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data.error || 'An error occurred while processing your request.',
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An unexpected error occurred.',
        });
      }
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Door Access Control
        </Typography>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField
            label="Device Log ID"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={deviceLogId}
            InputProps={{
              readOnly: true,
            }}
            required
          />
          <TextField
            label="Card Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <TextField
            label="Branch Name"
            variant="outlined"
            fullWidth
            margin="normal"
            select
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            required
          >
            <MenuItem value="shia">Shia Mosjid</MenuItem>
            <MenuItem value="lalmatia">Lalmatia Branch</MenuItem>
            <MenuItem value="multigym">MULTGYM</MenuItem>
          </TextField>
          <TextField
            label="Device Log Type"
            variant="outlined"
            fullWidth
            margin="normal"
            select
            value={deviceLogType}
            onChange={(e) => setDeviceLogType(e.target.value)}
            required
          >
            <MenuItem value={1}>PUNCH IN</MenuItem>
            <MenuItem value={2}>PUNCH OUT</MenuItem>
            <MenuItem value={3}>PUSH UP</MenuItem>
          </TextField>
          <Box display="flex" justifyContent="center" mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<FaDoorOpen />}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default App;
