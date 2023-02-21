import { Backdrop, Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";
import React, { useRef } from "react";
import LoginIcon from '@mui/icons-material/Login';
import { Stack } from "@mui/system";
const RegisterModal = (props: any) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 5,
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const username = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();
  function RegisterHandler (){
    const formData = {
      username: username.current?.value,
      password: password.current?.value
    }
    fetch(`${process.env.API}/users/register`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formData),
    }).then(async resp => {
      const value = await resp.json();
      if(value && value.message){

      } else {
        return handleClose()
      }
    }).catch(reason => {
    });
  }
  return (
    <div className="text-center">
      <Button variant="text" onClick={handleOpen}>Register</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="flex flex-col gap-3">
              <Typography id="transition-modal-title" variant="h6" component="h2" >
                Register
              </Typography>

              <TextField id="filled-username" label="Username" variant="filled" inputRef={username} />
              <TextField id="filled-password" type="password" label="Password" variant="filled" inputRef={password} />
              <Stack spacing={1} direction="column">
                <Button variant="outlined" className="w-fit mx-auto" onClick={RegisterHandler}>Register</Button>
                <Button variant="text" onClick={handleClose}>Login</Button>

              </Stack>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default RegisterModal;