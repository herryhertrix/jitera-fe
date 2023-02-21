import { AppBar, Button, Container, Experimental_CssVarsProvider, FormControlLabel, Stack, styled, Switch, Toolbar, useColorScheme } from '@mui/material';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { selectuser } from '../../redux/reducers/userReducer';
import LoginModal from '../modal/login';
import MenuPopper from '../menu/menu';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { getbalance, selectbalance } from '../../redux/reducers/balanceReducer';
import { useRouter } from 'next/router';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const MaterialUISwitch = styled(Switch)(({ theme }: any) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

const ModeSwitcher = () => {
    const { mode, setMode } = useColorScheme();
    const [check, setCheck] = useState(false)
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
        if (mode === 'light') {
            setCheck(false)
        } else {
            setCheck(true)
        }
    }, []);

    if (!mounted) {
        // for server-side rendering
        // learn more at https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
        return null;
    }
    function ChangeHandler() {
        if (mode === 'light') {
            setMode('dark');
            setCheck(true)
        } else {
            setMode('light');
            setCheck(false)
        }
    }


    return (
        <Experimental_CssVarsProvider>
            <FormControlLabel
                control={<MaterialUISwitch sx={{ m: 1 }} onChange={ChangeHandler} checked={check} />}
                label=""
            />
        </Experimental_CssVarsProvider>
    );
};



const Header = () => {
    const user = useSelector(selectuser)
    const balance = useSelector(selectbalance)
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const router = useRouter()
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleBidMenu = () =>{
        setAnchorElNav(null);
        router.push('/biditem')
    };
    const handleHomeMenu = () =>{
        setAnchorElNav(null);
        router.push('/')
    };
    const dispatch = useDispatch();
    useEffect(() => {
        if (user.id !== "") {
            fetch(`${process.env.API}/balances/` + user.id, {
                mode: "cors",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            }).then(async resp => {
                const {balance} = await resp.json()
                if (balance) {
                    dispatch(getbalance(balance))
                }
            }).catch(reason => {
            });
        }
    }, [user.id]);
    return (
        <div className='px-9'>
        <AppBar position="static" className='rounded-b-[25px]'>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem onClick={handleHomeMenu}>
                                <Typography textAlign="center">Home</Typography>
                            </MenuItem>
                            {user.id !== "" && <MenuItem onClick={handleBidMenu}>
                                <Typography textAlign="center">Bid Item</Typography>
                            </MenuItem>}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                         <ModeSwitcher/>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            onClick={handleHomeMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Home
                        </Button>
                        {user.id !== "" &&  <Button
                            onClick={handleBidMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Bid Item
                        </Button>}
                       
                        <ModeSwitcher/>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Stack spacing={1} direction="row">
                            {user.id !== "" && <div className='my-auto'>{user.username}, Balance: {balance.balance.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}</div>}
                            {user.username == "" && <LoginModal />}
                            {user.username !== "" && <MenuPopper />}
                        </Stack>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        </div>
    );
};

export default Header;