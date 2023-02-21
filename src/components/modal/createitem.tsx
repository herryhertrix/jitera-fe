import { Backdrop, Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import _ from 'lodash'
import { NumericFormatCustom } from "../../helpers/NumericFormatCustom";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useSelector } from "react-redux";
import { selectuser } from "../../redux/reducers/userReducer";
const CreateItemModal = () => {
  const user = useSelector(selectuser)
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
  const [value, setValue] = useState('')
  const [datevalue, setdatevalue] = useState<Dayjs | null>(
    dayjs(new Date),
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };


  const handleDateChange = (newValue: Dayjs | null) => {
    setdatevalue(newValue);
  };
  const itemName = useRef<HTMLInputElement>();
  function CreateItemHandler(){
    const formData = {
      userId: user.id,
      name: itemName.current?.value,
      timewindow: datevalue,
      startprice: value,
    }
    fetch(`${process.env.API}/items/createitem`, {
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
      <div className="cursor-pointer" onClick={handleOpen}>Create Item</div>
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
                Create Item
              </Typography>

              <TextField id="item-name" label="Name" focused inputRef={itemName} />
              <TextField
                label="Start Price"
                value={value}
                onChange={handleChange}
                name="numberformat"
                id="start-price"
                InputProps={{
                  inputComponent: NumericFormatCustom as any,
                }}
                focused
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Time Window"
                  value={datevalue}
                  inputFormat="YYYY/MM/DD hh:mm"
                  minDate={dayjs(new Date)}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField id="time-window" {...params} focused />}
                />
              </LocalizationProvider>
              <div className="flex flex-row-reverse gap-3">
                <Button variant="outlined" className="w-fit" onClick={CreateItemHandler}>Created</Button>
                <Button variant="outlined" className="w-fit ml-auto" onClick={handleClose}>Cancel</Button>


              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CreateItemModal;