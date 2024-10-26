import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import customAxios from "../../customAxios";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await customAxios.post("/api/users/register", {
        name,
        email: username,
        password,
      });
      const { token } = response.data;

      // Save the token and user info in localStorage
      localStorage.setItem("user", JSON.stringify({ token }));

      // Redirect to home or another page
      navigate("/");
    } catch (err) {
      setError("Registration failed. Please check your details.");
      console.error("Register failed:", err);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Register</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Name"
        fullWidth
        margin="normal"
      />
      <TextField
        type="email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label="Email"
        fullWidth
        margin="normal"
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        type="password"
        fullWidth
        margin="normal"
      />
      <Button onClick={handleRegister} variant="contained" color="primary">
        Register
      </Button>
    </Container>
  );
}

export default Register;
