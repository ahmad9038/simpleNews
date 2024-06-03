import React from "react";
import Alert from "@mui/material/Alert";
import { TextField, Snackbar } from "@mui/material";

const DynamicSnackBar = ({ openSnackbar, setOpenScnakbar, message }) => {
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenScnakbar(false); // Close the Snackbar
  };
  return (
    <div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleSnackBarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="success"
          sx={{
            width: "100%",
            bgcolor: "#3b82f6",
            color: "white",
          }}
          icon={false}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DynamicSnackBar;
