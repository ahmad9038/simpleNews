const express = require("express");
const router = express.Router();
const PostSchema = require("./models/PostSchema");
const AdminSchema = require("./models/Admin");
const jwt = require("jsonwebtoken");
const categories = require("../client/src/categories");

router.post("/addNews", async (req, res) => {
  try {
    const { title, category, content, image } = req.body;

    if (!title || !content || !image || !category) {
      return res.status(400).json({ error: "fill all fields" });
    }

    const addNews = new PostSchema({
      title,
      category,
      content,
      image,
    });

    await addNews.save();
    return res.status(200).json({ success: "created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

router.post("/updateNews", async (req, res) => {
  const { _id, title, category, content } = req.body;

  try {
    await PostSchema.findByIdAndUpdate(
      _id,
      {
        title,
        category,
        content,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({ success: "updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.delete("/deleteNews", async (req, res) => {
  const { id } = req.body;

  try {
    await PostSchema.findByIdAndDelete(id);
    return res.status(200).json({ success: "deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.post("/activeNews", async (req, res) => {
  const { id } = req.body;

  try {
    const post = await PostSchema.findById(id);

    if (!post) {
      return res.status(400).json({ error: "not found" });
    }

    post.active = !post.active;
    await post.save();

    return res
      .status(200)
      .json({ success: post.active ? "News Activated" : "News Paused" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit) || 3;
    const query = req.query.search;
    const category = req.query.category;

    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;
    const totalPosts = await PostSchema.countDocuments({});

    let posts;
    if (query) {
      posts = await PostSchema.find({
        title: { $regex: new RegExp(query, "i") },
        ...(category !== "All" && { category: category }),
      }).sort({ createdAt: -1 });
    } else {
      posts = await PostSchema.find({
        ...(category !== "All" && { category: category }),
      }).sort({ createdAt: -1 });
    }

    let data = posts.slice(startIndex, lastIndex);
    let totalPages = Math.ceil(totalPosts / limit);

    res.status(200).json({
      totalPosts: totalPosts,
      totalPages: totalPages,
      next: { page: page + 1 },
      prev: { page: page - 1 },
      posts: data,
    });
  } catch (error) {
    console.log(error);
    res.json(500).json({ error: "Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      res.status(400).json({ error: "fill all fields" });
      return;
    }

    const admin = await AdminSchema.findOne({ username });

    if (!admin) {
      res.status(400).json({ error: "invalid credentials" });
      return;
    }

    if (password !== admin.password) {
      res.status(400).json({ error: "invalid credentials" });
      return;
    }

    admin.password = undefined;
    const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(201).json({
      success: "login successfully",
      admin,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "server error" });
  }
});

router.get("/getSingleNews", async (req, res) => {
  const id = req.query.id;

  try {
    const post = await PostSchema.findById(id);

    if (!post) {
      return res.status(400).json({ error: "not found" });
    }

    return res.status(200).json({ post });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
