import { useEffect, useState } from 'react';
import { Grid, Stack, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import imgLogo from '../../assets/images/auth/img_logo.png';
import imgLogin from '../../assets/images/auth/img_login.png';
import { fetchData } from '../../components/FetchData';
import { AuthUrl } from '../../services/ApiUrls';
import '../../styles/style.css';

export default function Login() {
    const navigate = useNavigate();
    const [token, setToken] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (localStorage.getItem('Token')) {
            navigate('/app');
        }
    }, [token, navigate]);

    const handleLogin = async () => {
        const credentials = { email, password };
        const head = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        try {
            const res = await fetchData(`${AuthUrl}/login/`, 'POST', JSON.stringify(credentials), head);
            localStorage.setItem('Token', `Bearer ${res.access}`);
            setToken(true);
        } catch (error) {
            console.error('Error:', error);
            setError('Login failed. Please check your email and password.');
        }
    };

    return (
        <div>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent='center'
                alignItems='center'
                sx={{ height: '100%', width: '100%', position: 'fixed' }}
            >
                <Grid
                    container
                    item
                    xs={8}
                    direction='column'
                    justifyContent='space-evenly'
                    alignItems='center'
                    sx={{ height: '100%', overflow: 'hidden' }}
                >
                    <Grid item>
                        <Grid sx={{ mt: 2 }}>
                            <img src={imgLogo} alt='register_logo' className='register-logo' />
                        </Grid>
                        <Typography variant='h5' style={{ fontWeight: 'bolder' }}>Sign In</Typography>
                        <Grid item sx={{ mt: 4 }}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                margin="normal"
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                margin="normal"
                            />
                            {error && (
                                <Typography color="error" variant="body2">
                                    {error}
                                </Typography>
                            )}
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={handleLogin}
                                sx={{ mt: 2, fontSize: '14px', fontWeight: 500 }}
                            >
                                Sign in
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    container
                    item
                    xs={8}
                    direction='column'
                    justifyContent='center'
                    alignItems='center'
                    className='rightBg'
                    sx={{ height: '100%', overflow: 'hidden', justifyItems: 'center' }}
                >
                    <Grid item>
                        <Stack sx={{ alignItems: 'center' }}>
                            <h3>Welcome to BottleCRM</h3>
                            <p>Free and OpenSource CRM from small medium business.</p>
                            <img
                                src={imgLogin}
                                alt='register_ad_image'
                                className='register-ad-image'
                            />
                            <footer className='register-footer'>
                                bottlecrm.com
                            </footer>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </div>
    );
}
