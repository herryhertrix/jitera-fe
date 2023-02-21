import { Backdrop, Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LoginIcon from '@mui/icons-material/Login';
import { Stack } from "@mui/system";
import _ from 'lodash'
import { NumericFormat, NumericFormatProps } from 'react-number-format';
interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        prefix="$"
      />
    );
  },
);