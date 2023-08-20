const express = require('express');
const router = express.Router();
const db = require('../db');

// comment created
router.post('/create', (req, res) => {
    const { content, userid, postid, avatar, name } = req.body;
    const sql = 'INSERT INTO comments (content, userid, postid, avatar, name) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [content, userid, postid, avatar, name], (err, result) => {
      if (err) {
        console.error('Error creating comment:', err);
        res.status(500).send('Error creating comment ');
        return;
      }
      res.status(201).send('comment created');
    });
  });

  
// Get all posts
router.get('/allcomment/:postid', (req, res) => {
    console.log(req.params.post)
    const sql = 'SELECT * FROM comments where postid = ' + req.params.postid;
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error reading comments:', err);
        res.status(500).send('Error reading comments');
        return;
      }
      res.json(results);
    });
  });

module.exports=router;