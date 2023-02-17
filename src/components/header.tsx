import LoginIcon from '@mui/icons-material/Login';
import { Button, Experimental_CssVarsProvider, useColorScheme } from '@mui/material';
import React from "react";
const ModeSwitcher = () => {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // for server-side rendering
        // Read more on https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
        return null;
    }

    return (
        <Button
        color="secondary" variant="contained"
            onClick={() => {
                if (mode === 'light') {
                    setMode('dark');
                } else {
                    setMode('light');
                }
            }}
        >
            {mode === 'light' ? 'Dark' : 'Light'}
        </Button>
    );
};


const Header = () => {
    return (
        <div>
            <Experimental_CssVarsProvider>
                <ModeSwitcher />
            </Experimental_CssVarsProvider>
            <LoginIcon></LoginIcon>
        </div>
    );
};

export default Header;