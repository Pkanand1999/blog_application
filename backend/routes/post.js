
const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a new post
router.post('/create', (req, res) => {
  const { title, content, userid, avatar, name } = req.body;
  const sql = 'INSERT INTO posts (title, content, userid, avatar, name) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [title, content, userid, avatar, name], (err, result) => {
    if (err) {
      console.error('Error creating post:', err);
      res.status(500).send('Error creating post');
      return;
    }
    res.status(201).send('Post created');
  });
});

// Get all posts
router.get('/posts', (req, res) => {
  const sql = 'SELECT * FROM posts';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error reading posts:', err);
      res.status(500).send('Error reading posts');
      return;
    }
    res.json(results);
  });
});

// // Update a post by ID
router.get('/individual/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM posts where id = ' + id;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error updating post:', err);
      res.status(500).send('Error updating post');
      return;
    }
    res.json(result);
  });
});

module.exports=router;