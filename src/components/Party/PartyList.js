import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
import customAxios from "../../customAxios";

function PartyList() {
  const [parties, setParties] = useState([]);
  const token = JSON.parse(localStorage.getItem("userId"))?._id;

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await customAxios.get("/api/products");
        setParties(response.data);
      } catch (error) {
        console.error("Error fetching parties:", error);
      }
    };

    fetchParties();
  }, []);

  const handleJoinParty = async (partyId) => {
    // const userId = "671cd122488df9c76c51bb40"; // Replace with actual user ID logic

    try {
      await customAxios.post(`api/party/join-party/${partyId}`, {
        userId,
      });
      window.location.href = `/party/${partyId}`; // Navigate to PartyDetail page
    } catch (error) {
      console.error("Error joining party:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Parties
      </Typography>
      <Grid container spacing={3}>
        {parties.map((party) => (
          <Grid item xs={12} sm={6} md={4} key={party._id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{party.title}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {party.location}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {party.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleJoinParty(party._id)}
                >
                  Join Party
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default PartyList;
