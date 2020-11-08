import React from "react";

import { Box, FormControl, InputLabel, Input } from "@material-ui/core";

export default function FormField({ name, value, marginY = 2, ...props }) {
  return (
    <Box marginY={marginY}>
      <FormControl fullWidth>
        <InputLabel htmlFor={`${name}Input`}>{name}</InputLabel>
        <Input id={`${name}Input`} value={value} name={name} {...props} />
      </FormControl>
    </Box>
  );
}
