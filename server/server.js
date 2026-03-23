const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connection established'))
    .catch(err => console.log(err));

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email : email})
    .then(user => {
        if (user) {
            if (user.password === password) {
                res.json('Successful login');
            }else{
                res.json('Incorrect password');
            }
        }else{
            res.json('No account found for this email');
        }
    })
})

app.post('/signup', (req, res) => {
    UserModel.create(req.body)
    .then(user => {res.json("Success")})
    .catch(err => res.json(err))
})

app.listen(port, () =>{
  console.log('Server running on port: ' + port);
});