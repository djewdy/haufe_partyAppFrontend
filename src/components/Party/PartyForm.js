import React from "react";
import { Container, TextField, Button, Typography } from "@mui/material";

function PartyForm() {
  return (
    <Container>
      <Typography variant="h4">Post a New Party</Typography>
      <TextField label="Party Name" fullWidth margin="normal" />
      <TextField label="Location" fullWidth margin="normal" />
      <TextField
        label="Todo List"
        placeholder="Add activities"
        multiline
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary">
        Post Party
      </Button>
    </Container>
  );
}

export default PartyForm;
