import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  Checkbox,
} from "@mui/material";
import customAxios from "../../customAxios";

function PartyDetail() {
  const [party, setParty] = useState(null);
  const [activities, setActivities] = useState([]);
  const [checkedActivities, setCheckedActivities] = useState(new Set());
  const [message, setMessage] = useState("");

  // Function to get partyId from the URL
  const getPartyIdFromUrl = () => {
    const url = window.location.href;
    const match = url.match(/\/party\/([a-f0-9]{24})$/);
    return match ? match[1] : null;
  };

  const partyId = getPartyIdFromUrl();

  useEffect(() => {
    const fetchPartyDetails = async () => {
      try {
        const response = await customAxios.get(`/api/products/${partyId}`);
        setParty(response.data);
        setActivities(response.data.todoList || []);
      } catch (error) {
        console.error("Error fetching party details:", error);
      }
    };

    fetchPartyDetails();
  }, [partyId]);

  const handleCheckboxChange = async (activity) => {
    const updatedCheckedActivities = new Set(checkedActivities);
    const userId = "671cd122488df9c76c51bb40";

    if (updatedCheckedActivities.has(activity.task)) {
      updatedCheckedActivities.delete(activity.task);
    } else {
      updatedCheckedActivities.add(activity.task);

      try {
        const response = await customAxios.post(
          `/api/party/assign-task/${partyId}`,
          {
            taskId: activity._id,
            userId: userId,
          }
        );
        console.log(response.data.message);
      } catch (error) {
        console.error("Error assigning task:", error);
      }
    }

    setCheckedActivities(updatedCheckedActivities);
  };

  const handleSendMessage = () => {
    console.log("Message sent:", message);
    setMessage(""); // Clear input after sending
  };

  if (!party) {
    return <Typography>Loading...</Typography>; // Loading state
  }

  return (
    <Container>
      <Typography variant="h4">{party.title}</Typography>
      <Typography variant="subtitle1">Location: {party.location}</Typography>
      <Typography variant="h6">Chat</Typography>
      <TextField
        label="Type a message"
        fullWidth
        margin="normal"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSendMessage}>
        Send
      </Button>

      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Todo List
      </Typography>
      <List>
        {activities.map((activity) => (
          <ListItem key={activity._id}>
            <Checkbox
              checked={
                activity.status === "completed" ||
                checkedActivities.has(activity.task)
              }
              onChange={() => handleCheckboxChange(activity)}
              disabled={activity.status === "completed"}
            />
            <Typography>{activity.task}</Typography>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default PartyDetail;
