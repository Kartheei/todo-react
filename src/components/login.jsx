import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../assets/css/style.css';
const Login = () => {
    const [credentials, setCredentials] = useState({
        firstname: '',
        lastname: '',
    });
    const navigate = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const emptyFields = Object.keys(credentials).filter(key => credentials[key] === '');

        if (emptyFields.length > 0) {
            return(<></>);
        }
        localStorage.setItem('firstname', credentials.firstname);
        localStorage.setItem('lastname', credentials.lastname);
        navigate('/todo');
        console.log(credentials);
    };

    return (
        <div className='loginForm'>
            <div className="form-container">
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Enter the details
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField className='inputField'
                                margin="normal"
                                required
                                fullWidth
                                id="firstname"
                                label="Firstname"
                                name="firstname"
                                autoComplete="firstname"
                                value={credentials.firstname}
                                onChange={handleChange}
                            />
                            <TextField className='inputField'
                                margin="normal"
                                required
                                fullWidth
                                id="lastname"
                                label="Lastname"
                                name="lastname"
                                autoComplete="lastname"
                                value={credentials.lastname}
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Go
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </div>

        </div>

    );
}

export default Login;