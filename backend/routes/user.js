const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const {faker} = require('@faker-js/faker')
const jwt = require('jsonwebtoken')
const authLoginUser= require('../middleware');
require('dotenv').config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; //key of json web token
//generate token
async function generateToken(payload) {
    console.log(JWT_SECRET_KEY)
    let token=await jwt.sign(payload, JWT_SECRET_KEY);
    return token;
}

// Route for user registration
router.post('/register', async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const exist = 'SELECT * FROM users WHERE email = ?';
        db.query(exist, [email], async (err, results) => {
          if (err) {
            console.error('Error fetching user data:', err);
            res.status(500).send('Error fetching user data');
            return;
          }
    
          if (results.length > 0) {
            res.status(404).send('User already Exists');
            return;
          }
        
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const image=faker.internet.avatar();
        const sql = 'INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)';
        db.query(sql, [name, email, hashedPassword, image], (err, result) => {
          if (err) {
            console.error('Error registering user:', err);
            res.status(500).send('Error registering user');
            return;
          }
          res.status(201).send('User registered');
        })})
      } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
      }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.query(sql, [email], async (err, results) => {
          if (err) {
            console.error('Error fetching user data:', err);
            res.status(500).send('Error fetching user data');
            return;
          }
    
          if (results.length === 0) {
            res.status(404).send('User not found');
            return;
          }
    
          const user = results[0];
    
          // Compare the provided password with the hashed password in the database
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            let token=await generateToken(user.email);
            user.token=token;
            console.log(user)
            res.status(200).send(user);
          } else {
            res.status(401).send('Invalid credentials');
          }
        });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
      }
});

// check token validity and find user detail and this token send by front end 
router.get('/islogin',authLoginUser, async(req, res) => {
    try {

        const email =await req.verification;
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.query(sql, [email], async (err, results) => {
          if (err) {
            console.error('Error fetching user data:', err);
            res.status(500).send('Error fetching user data');
            return;
          }
    
          if (results.length === 0) {
            res.status(404).send('User not found');
            return;
          }
    
          const user = results[0];
    
          return res.status(200).send({
            data: user
        })
        });
       
        
    } catch(err) {
        console.error(err.message);
        
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
});



module.exports = router;