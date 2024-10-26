import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import customAxios from "../../customAxios";

function PartyForm() {
  const [partyName, setPartyName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [activity, setActivity] = useState("");
  const [todoList, setTodoList] = useState([]);
  const userId = JSON.parse(localStorage.getItem("userId"))?._id;

  const handleAddActivity = () => {
    if (activity.trim()) {
      setTodoList([...todoList, { task: activity.trim(), status: "pending" }]);
      setActivity("");
    }
  };

  const handleRemoveActivity = (index) => {
    setTodoList(todoList.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!partyName || !location) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const partyData = {
      title: partyName,
      location,
      description,
      todoList,
      creator: userId,
    };

    try {
      const response = await customAxios.post("api/products/", partyData);
      console.log("Party posted:", response.data);
      // Clear the form after successful submission
      setPartyName("");
      setLocation("");
      setTodoList([]);
    } catch (error) {
      console.error("Error posting party:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Post a New Party</Typography>
      <TextField
        label="Party Name"
        value={partyName}
        onChange={(e) => setPartyName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Add Activity"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddActivity}>
        Add to Todo List
      </Button>

      <List>
        {todoList.map((item, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton
                edge="end"
                color="error"
                onClick={() => handleRemoveActivity(index)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={item.task} />
          </ListItem>
        ))}
      </List>

      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        onClick={handleSubmit}
      >
        Post Party
      </Button>
    </Container>
  );
}

export default PartyForm;
