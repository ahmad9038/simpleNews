import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { usePostContext } from "../context/postContext";
import DynamicSnackBar from "./DynamicSnackBar";
import { MenuItem, Select, TextField } from "@mui/material";
import categories from "../categories";
import { BASE_URL } from "../services/helper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

const UpdateModal = ({ trigger, post, setTrigger }) => {
  const { getData } = usePostContext();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTrigger(false);
  };

  const [title, setTitle] = React.useState(post.title);
  const [category, setCategory] = React.useState(post.category);
  const [content, setContent] = React.useState(post.content);

  const [change, setChange] = React.useState(false);
  useEffect(() => {
    if (
      title !== post.title ||
      category !== post.category ||
      content !== post.content
    ) {
      setChange(true);
    } else {
      setChange(false);
    }
  }, [title, category, content, []]);

  useEffect(() => {
    if (trigger) {
      handleOpen();
    }
  }, [trigger]);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  // update post***********************
  const [loading, setLoading] = React.useState(false);
  const [openSnackbar, setOpenScnakbar] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const fetchUpdate = async () => {
    setLoading(true);
    const URL = `${BASE_URL}/api/updateNews`;

    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: title,
          category: category,
          content: content,
          _id: post._id,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage(data.success);
        setOpenScnakbar(true);
        handleClose();
        getData();
      } else {
        const errorMessage = await res.json();
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        {/* ... */}

        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              Update
            </Typography>
            <TextField
              id="title"
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={title}
              onChange={handleTitle}
            />
            <Select
              id="category"
              label="Category"
              variant="outlined"
              fullWidth
              margin="normal"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            <TextField
              id="content"
              label="Content"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              placeholder="Content"
              margin="normal"
              onChange={handleContent}
              value={content}
            />

            {change ? (
              <Button
                variant="contained"
                color="primary"
                onClick={fetchUpdate}
                style={{ marginTop: "16px" }}
                disabled={loading}
              >
                {!loading ? "Update" : "Loading..."}
              </Button>
            ) : (
              <></>
            )}
          </Box>
        </Modal>
      </div>

      <DynamicSnackBar
        openSnackbar={openSnackbar}
        setOpenScnakbar={setOpenScnakbar}
        message={message}
      />
    </>
  );
};

export default UpdateModal;
