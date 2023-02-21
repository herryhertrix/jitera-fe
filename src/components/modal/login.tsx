import { Backdrop, Box, Button, Fade, FormControl, Modal, TextField, Typography } from "@mui/material";
import React, { useRef } from "react";
import LoginIcon from '@mui/icons-material/Login';
import { Stack } from "@mui/system";
import RegisterModal from "./register";
import { login } from "../../redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import { saveState } from "../../redux/localstorage";
const LoginModal = (props: any) => {
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
  const dispatch = useDispatch();
  async function islogin() {
    const formData = {
      username: username.current?.value,
      password: password.current?.value
    }
    fetch(`${process.env.API}/users/login`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formData),
    }).then(async resp => {
      const value = await resp.json();
      if (value) {
        dispatch(login({username: value.username, id: value._id}))
        saveState({username: value.username, id: value._id});
      }
    }).catch(reason => {
    });
  }
  return (
    <div className="ml-auto my-auto">
      <LoginIcon onClick={handleOpen} className="mr-5" ></LoginIcon>
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

            <Typography id="transition-modal-title" variant="h6" component="h2" className="pb-2" >
              Login
            </Typography>
            <FormControl className="flex flex-col gap-3">
              <TextField id="username" label="Username" variant="filled" inputRef={username} />
              <TextField id="password" type="password" label="Password" variant="filled" inputRef={password} />
              <Stack spacing={1} direction="column">
                <Button type="submit" variant="outlined" onClick={islogin} className="w-fit mx-auto">Login</Button>
                <RegisterModal></RegisterModal>

              </Stack>
            </FormControl>

          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default LoginModal;