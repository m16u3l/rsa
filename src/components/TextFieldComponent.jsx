import React from "react";

import { TextField } from "@mui/material";
import { Box } from "@mui/system";

const TextFieldComponent = ({ value, handleChangeText }) => {
  return (
    <Box m={2}>
      <TextField
        onChange={(event, newValue) => handleChangeText(newValue)}
        variant="filled"
        value={value}
        style={{ width: '70%' }}
        m={2}
        label="Mensaje descifrado"
        color="primary" />
    </Box>
  );
}

export default TextFieldComponent;
