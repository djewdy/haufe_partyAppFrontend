import React from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

function PartyList() {
  // This should ideally pull data from a database
  const parties = [
    { name: "Beach Party", location: "Miami" },
    { name: "House Party", location: "LA" },
  ];

  return (
    <Container>
      <Typography variant="h4">All Parties</Typography>
      <List>
        {parties.map((party, index) => (
          <ListItem key={index}>
            <ListItemText primary={party.name} secondary={party.location} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default PartyList;
