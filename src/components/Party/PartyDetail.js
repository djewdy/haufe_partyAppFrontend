import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  Checkbox,
} from "@mui/material";

function PartyDetail() {
  // Example to-do list
  const activities = [
    { name: "Bring food", completed: false },
    { name: "Set up decorations", completed: false },
  ];

  return (
    <Container>
      <Typography variant="h4">Party Name</Typography>
      <Typography variant="subtitle1">Location: Miami</Typography>
      <Typography variant="h6">Chat</Typography>
      <TextField label="Type a message" fullWidth margin="normal" />
      <Button variant="contained" color="primary">
        Send
      </Button>

      <Typography variant="h6">Todo List</Typography>
      <List>
        {activities.map((activity, index) => (
          <ListItem key={index}>
            <Checkbox checked={activity.completed} />
            <Typography>{activity.name}</Typography>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default PartyDetail;
