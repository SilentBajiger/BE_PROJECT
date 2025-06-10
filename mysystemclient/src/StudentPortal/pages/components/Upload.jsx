import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Typography,
  Paper,
  Alert,
  TextField,
  LinearProgress,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";
import { useSocket } from "../../../Context/ContextProvider";

// Gradient animation for progress bar
const gradientAnimation = keyframes`
  0% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Upload = ({
  btnDisabled,
  setBtnDisabled,
  text,
  setText,
  uploading,
  setUploading,
}) => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [btnText, setBtnText] = useState("Upload");
  const [digilocker_user_id, set_digilocker_user_id] = useState("");
  const [digilocker_password, set_digilocker_password] = useState("");
  const [progressVal, setProgressVal] = useState(0);
  const fileInputRef = useRef(null);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on("progressUp", (data) => setProgressVal(data?.value));
    return () => socket.off("progressUp");
  }, [socket]);

  useEffect(() => {
    if (digilocker_user_id && digilocker_password && file)
      setBtnDisabled(false);
    else setBtnDisabled(true);
  }, [digilocker_user_id, digilocker_password, file]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setBtnText("Upload");
    setText("");
    setUploading(false);
    setProgressVal(0);
  };

  const handleUpload = async () => {
    if (!file || !digilocker_user_id || !digilocker_password) {
      alert("Please fill all fields and select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    const user = JSON.parse(localStorage.getItem("system-token"));
    if (!user) {
      alert("Unauthorized");
      return;
    }

    formData.append("userId", user.userId);
    formData.append("password", user.password);
    formData.append("digilocker_password", digilocker_password);
    formData.append("digilocker_user_id", digilocker_user_id);

    setUploading(true);
    setBtnDisabled(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/doc/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResponse(res.data);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setText("File Uploaded Successfully!");
      setBtnText("Uploaded ✅");
      setFile(null);
      setUploading(false);
      fileInputRef.current.value = "";
    } catch (err) {
      setSnackbarSeverity("error");
      setResponse({ msg: err?.response?.data?.msg });
      setOpenSnackbar(true);
      setUploading(false);
      setBtnDisabled(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        minWidth: "99vh",
        background: "linear-gradient(to right, #f3e5f5, #e0f7fa)",
        px: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <Paper
          elevation={6}
          sx={{ p: 4, borderRadius: 4, textAlign: "center" }}
        >
          <Typography
            variant="h5"
            fontWeight={600}
            color="#4E73DF"
            gutterBottom
          >
            Upload Your Document
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              label="Digilocker User ID"
              variant="outlined"
              fullWidth
              required
              value={digilocker_user_id}
              onChange={(e) => set_digilocker_user_id(e.target.value)}
            />
            <TextField
              label="Digilocker Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              value={digilocker_password}
              onChange={(e) => set_digilocker_password(e.target.value)}
            />

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="file-input"
            />
            <label htmlFor="file-input">
              <Button
                variant="contained"
                component="span"
                startIcon={<UploadFileIcon />}
                fullWidth
                sx={{
                  py: 1.4,
                  fontWeight: "bold",
                  borderRadius: 2,
                  color: "#fff",
                  background: "linear-gradient(90deg, #4E73DF, #6A89F7)",
                  backgroundSize: "200% 100%",
                  transition: "all 0.4s ease",
                  animation: "gradientMove 4s linear infinite",
                  "&:hover": {
                    backgroundPosition: "right center",
                    boxShadow: "0 4px 20px rgba(78, 115, 223, 0.4)",
                  },
                  "@keyframes gradientMove": {
                    "0%": {
                      backgroundPosition: "0% 50%",
                    },
                    "100%": {
                      backgroundPosition: "100% 50%",
                    },
                  },
                }}
              >
                Choose File
              </Button>
            </label>

            {file && (
              <Typography variant="body2" color="text.secondary" noWrap>
                Selected: {file.name}
              </Typography>
            )}

            <Button
              variant="contained"
              onClick={handleUpload}
              startIcon={!uploading && <CloudUploadIcon />}
              disabled={btnDisabled}
              fullWidth
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
              {uploading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                btnText
              )}
            </Button>

            <LinearProgress
              variant="determinate"
              value={progressVal}
              sx={{
                height: 7,
                borderRadius: 6,
                backgroundColor: "#e0e0e0",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 6,
                  backgroundImage:
                    "linear-gradient(270deg, #ff6ec4, #7873f5, #4ADEDE, #C984FF, #ff6ec4)",
                  backgroundSize: "600% 600%",
                  animation: `${gradientAnimation} 4s linear infinite`,
                },
              }}
            />

            {text && (
              <Typography variant="body1" color="green" fontWeight={500}>
                {text}
              </Typography>
            )}
          </Box>
        </Paper>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={snackbarSeverity} sx={{ width: "100%" }}>
            {response ? response.msg : "Something went wrong."}
          </Alert>
        </Snackbar>
      </motion.div>
    </Box>
  );
};

export default Upload;
