import { Container, Grid } from '@mui/material';
import React, { useRef } from 'react';
import {
    Card,
    Button,
    TextField,
    Checkbox,
    Link,
    FormControlLabel,
    Box,
    Typography,
} from "@mui/material";


import { useState, useEffect } from 'react';
import Img1 from '../Assets/Img_01.png';
import Img2 from '../Assets/slnko_white_logo.png';
import Img3 from '../Assets/Protrac blue.png';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [isRemembered, setIsRemembered] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsRemembered(event.target.checked);
    };

    return (
        <Container maxWidth="xxl" sx={{ padding: '0px!important', backgroundColor: '#12263F' }}>
            {/* <Grid container sx={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}> */}
            <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                <Grid item xs={12} md={7} sx={{ height: '100vh' }}>
                    <img src={Img1} alt='picture1' style={{ height: '100%', width: '100%', position: 'relative',opacity:0.5, visibility: {xl:'flex', md:'none'} }} />
                    <img src={Img2} alt='picture2' style={{ position: 'absolute', top: '-160px', left: '-75px', zIndex: '1' }} />
                    {/* </Grid> */}
                </Grid>
                <Grid item xs={12} md={5} sx={{ height: '100vh', display: 'flex' }}>
                    <Grid container justifyContent="center" alignItems="center">

                        <Card sx={{ boxShadow: 3, padding: 3, borderRadius: 10 }}>
                            <Box textAlign="center" mb={3}>
                                <img src={Img3} alt="Logo" style={{ width: '70%', height: 'auto' }} />
                            </Box>
                            <form method="post" action="" encType="multipart/form-data">
                                <Box mb={2}>
                                    <Typography variant="h6" sx={{ fontFamily: 'Playfair Display', fontWeight: 'bold', color: 'cornflowerblue' }}>
                                        Username
                                    </Typography>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        name="username"
                                        placeholder="Enter username"
                                        required
                                        sx={{ borderWidth: 3 }}
                                    />

                                </Box>

                                <Box mb={3}>
                                    <Typography variant="h6" sx={{ fontFamily: 'Playfair Display', fontWeight: 'bold', color: 'cornflowerblue' }}>
                                        Password
                                    </Typography>
                                    <Box display="flex" alignItems="center" position="relative">
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter password"
                                            required
                                            sx={{ borderWidth: 3 }}
                                        />

                                        <Box
                                            onClick={togglePasswordVisibility}
                                            sx={{
                                                position: 'absolute',
                                                right: 10,
                                                cursor: 'pointer',
                                            }}
                                        >
                                            👁️
                                        </Box>

                                    </Box>
                                </Box>
                                
                                    <Grid container spacing={2}  alignItems="flex-start">
                                        <Grid item xs={12} md={6} sm={6}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        id="remember-checkbox"
                                                        checked={isRemembered}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                }
                                                label="Remember me"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} sm={6}>
                                            <Link href="#" className="forgot-pass-link" underline="hover" style={{float:'right', marginTop:'10px'}}>
                                                Forgot Your Password?
                                            </Link>
                                        </Grid>
                                    </Grid>
                                

                                <Box display="flex" justifyContent="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        sx={{ padding: '10px 30px', fontSize: '1rem' }}
                                    >
                                        Log In
                                    </Button>
                                </Box>
                            </form>
                        </Card>
                    </Grid>
                    {/* </Grid> */}
                </Grid>

            </Grid>
        </Container>

    );
};
export default Login;