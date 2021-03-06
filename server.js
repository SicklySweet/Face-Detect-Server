const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const knex = require('knex');
const bcrypt = require('bcrypt');
// Modules
const register = require('./Controllers/register');
const SignIn = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const imageCounter = require('./Controllers/imageCounter');

app.use(bodyParser.json());
app.use(cors());

const database = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
});

app.get('/', (req, res) => {
    res.send('it is working');
})

// SignIn

app.post('/signin', (req, res) => {SignIn.handleSignIn(req, res, database, bcrypt)})

// Register

app.post('/register', (req, res) => {register.handleRegister(req, res, database, bcrypt)})

// Profile:ID

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, database)})

// Image Counter

app.put('/image', (req, res) => {imageCounter.handleImageCounter(req, res, database)})
app.post('/imageUrl', (req, res) => {imageCounter.handleApiCall (req,res)})

app.listen(process.env.PORT || 3000, () => {
    console.log(`running on port ${process.env.PORT}`)
});