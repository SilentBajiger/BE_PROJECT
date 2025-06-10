import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";

const Login = () => {
  const [user, setUser] = useState({
    userId: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      if (user.userId === "" || user.password === "") {
        alert("Please fill all the fields");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/user/login",
        user
      );
      if (response.status !== 200) {
        alert(response.data.msg);
        return;
      }

      alert(response.data.msg);
      const data = response.data;
      const token = data.user;
      localStorage.setItem("system-token", JSON.stringify(token));

      navigate("/student/student-page");
      setUser({ userId: "", password: "" });
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "80vh", // Adjusted for navbar height
        minWidth: "100vw", // Adjusted for navbar height
        background: "linear-gradient(to right, #e0f7fa, #f3e5f5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 4,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: "600px" }} // Wider form
      >
        <Paper
          elevation={5}
          sx={{
            padding: 5,
            borderRadius: 4,
            backgroundColor: "white",
            boxShadow: "0 6px 24px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700, color: "#4E73DF" }}
          >
            Student Login
          </Typography>

          <form onSubmit={handleSignup}>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}
            >
              <TextField
                label="User ID"
                variant="outlined"
                fullWidth
                required
                value={user.userId}
                onChange={(e) => setUser({ ...user, userId: e.target.value })}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                required
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  py: 1.4,
                  fontWeight: "bold",
                  background: "linear-gradient(135deg, #4E73DF, #6C5DD3)",
                  color: "#fff",
                  boxShadow: "0 4px 12px rgba(78, 115, 223, 0.3)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    background: "linear-gradient(135deg, #3e65c1, #574fcf)",
                    transform: "scale(1.03)",
                    boxShadow: "0 6px 20px rgba(78, 115, 223, 0.4)",
                  },
                }}
              >
                Log In
              </Button>
            </Box>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Login;
