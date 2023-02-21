import { Backdrop, Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import _ from 'lodash'
import { NumericFormatCustom } from "../../helpers/NumericFormatCustom";
import { useDispatch, useSelector } from "react-redux";
import { selectuser } from "../../redux/reducers/userReducer";
import { getbalance } from "../../redux/reducers/balanceReducer";
const DepositModal = () => {
  const user = useSelector(selectuser)
  const dispatch = useDispatch()
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
  const handleOpen = () => { setOpen(true) };

  const handleClose = () => setOpen(false);

  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  function DepositHandler() {
    const formData = {
      amount: value,
      userId: user.id
    }
    fetch(`${process.env.API}/balances/deposit`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formData),
    }).then(async resp => {
      const { balance } = await resp.json();
      if (balance) {
        dispatch(getbalance(balance))
      }
      handleClose()
    }).catch(reason => {
    });
  }
  return (
    <div className="text-center">
      <div className="cursor-pointer" onClick={handleOpen}>Deposit</div>
      <Modal
        keepMounted
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
            <div className="flex flex-col gap-5">
              <Typography id="transition-modal-title" variant="h6" component="h2" >
                Deposit
              </Typography>
              <TextField
                label="Amount"
                value={value}
                onChange={handleChange}
                name="numberformat"
                id="deposit-amount"
                InputProps={{
                  inputComponent: NumericFormatCustom as any,
                }}
                focused
              />
              <div className="flex flex-row-reverse gap-3">
                <Button variant="outlined" className="w-fit" onClick={DepositHandler}>Deposit</Button>
                <Button variant="outlined" className="w-fit ml-auto" onClick={handleClose}>Cancel</Button>


              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default DepositModal;