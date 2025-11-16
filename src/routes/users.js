const express = require('express');
const router = express.Router();
const User = require('../models/User');   // make sure file is Users.js

// CREATE - Add a new user
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const createdUser = await User.create({ email, password });
    res.status(201).json({ success: true, message: "User created", user: createdUser });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// READ - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// READ - Get one user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.json({ success: true, user });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// UPDATE - Update user by ID
router.put('/:id', async (req, res) => {
  try {
    const updates = {};
    if (req.body.email) updates.email = req.body.email;
    if (req.body.password) updates.password = req.body.password;

    const updated = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).lean();

    if (!updated) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.json({ success: true, message: "User updated", user: updated });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// DELETE - Remove user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id).lean();

    if (!deleted) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.json({ success: true, message: "User deleted", user: deleted });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
