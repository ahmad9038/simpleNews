import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { usePostContext } from "../context/postContext";
import { MenuItem, Select, TextField } from "@mui/material";
import DynamicSnackBar from "./DynamicSnackBar";
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

const CreateNews = ({ trigger, setTrigger }) => {
  const { getData } = usePostContext();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTrigger(false);
  };

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (trigger) {
      handleOpen();
    }
  }, [trigger]);

  // create post***********************
  const [loading, setLoading] = React.useState(false);

  const [openSnackbar, setOpenScnakbar] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const createNews = async () => {
    setLoading(true);
    const URL = `${BASE_URL}/api/addNews`;

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
          image: image,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage(data.success);
        setOpenScnakbar(true);
        handleClose();
        getData();

        setTitle("");
        setCategory(categories[0]);
        setContent("");
        setImage("");
      } else {
        const data = await res.json();
        setMessage(data.error);
        setOpenScnakbar(true);
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
              Add News
            </Typography>
            <TextField
              id="title"
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              {categories.map((category) => (
                <MenuItem value={category}>{category}</MenuItem>
              ))}
            </Select>
            <TextField
              id="image"
              label="Image URL"
              variant="outlined"
              fullWidth
              margin="normal"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <TextField
              id="content"
              label="Content"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              placeholder="Content"
              margin="normal"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={createNews}
              style={{ marginTop: "16px" }}
              disabled={loading}
            >
              {!loading ? "Create News" : "Loading..."}
            </Button>
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

export default CreateNews;
