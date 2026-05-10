const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');
const DailyJournalModel = require('./models/DailyJournal');
const SleepJournalModel = require('./models/SleepJournal');
const WorkoutJournalModel = require('./models/WorkoutJournal');
const PersonalGrowthModel = require('./models/PersonalGrowth');
const userRoutes = require('./routes/userRoutes');
const dailyJournalRoutes = require('./routes/dailyJournalRoutes');
const sleepJournalRoutes = require('./routes/sleepJournalRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/journal', dailyJournalRoutes);
app.use('/api/sleep', sleepJournalRoutes);

console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connection established'))
    .catch(err => console.log(err));

const bcrypt = require('bcrypt');

// ── Auth ──────────────────────────────────────────────────────
app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    if (!user) return res.json({status: 'No account found for this email'});
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.json({status: 'Incorrect password'});
    res.json({status: 'Successful login', userId: user._id, name: user.name});
})

app.post('/signup', async (req, res) => {
    const {name, email, password} = req.body;
    const existing = await UserModel.findOne({email});
    if (existing) return res.json({status: 'Email already in use'});
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({name, email, passwordHash});
    res.json({status: 'Success', userId: user._id, name: user.name});
})

app.post('/signup', (req, res) => {
    UserModel.create(req.body)
    .then(user => res.json({status: "Success", userId: user._id, name: user.name}))
    .catch(err => res.json(err))
})

// Test to verify the server can fetch all user records
app.get('/test', async (req, res) => {
    try {
        //get every user document from the database
        const users = await UserModel.find();
        //return the result as JSON.
        res.json(users);
    } catch (err) {
        //return a 500 error with the message
        res.status(500).json({ error: err.message });
    }
});

// ── Daily Journal ─────────────────────────────────────────────
// Save a new daily journal entry
app.post('/journal', (req, res) => {
    DailyJournalModel.create(req.body)
    .then(entry => res.json(entry))
    .catch(err => res.json(err))
})

// Get all daily journal entries for a user
app.get('/journal/:userId', (req, res) => {
    DailyJournalModel.find({userId: req.params.userId})
    .sort({date: -1})
    .then(entries => res.json(entries))
    .catch(err => res.json(err))
})

// ── Sleep Journal ─────────────────────────────────────────────
// Save a new sleep journal entry
app.post('/sleep', (req, res) => {
    SleepJournalModel.create(req.body)
    .then(entry => res.json(entry))
    .catch(err => res.json(err))
})

// Get all sleep journal entries for a user
app.get('/sleep/:userId', (req, res) => {
    SleepJournalModel.find({userId: req.params.userId})
    .sort({date: -1})
    .then(entries => res.json(entries))
    .catch(err => res.json(err))
})

// ── Workout Journal ───────────────────────────────────────────
// Save a new workout journal entry
app.post('/workout', (req, res) => {
    WorkoutJournalModel.create(req.body)
    .then(entry => res.json(entry))
    .catch(err => res.json(err))
})

// Get all workout journal entries for a user
app.get('/workout/:userId', (req, res) => {
    WorkoutJournalModel.find({userId: req.params.userId})
    .sort({date: -1})
    .then(entries => res.json(entries))
    .catch(err => res.json(err))
})

// ── Personal Growth ───────────────────────────────────────────
// Save a new personal growth entry
app.post('/growth', (req, res) => {
    PersonalGrowthModel.create(req.body)
    .then(entry => res.json(entry))
    .catch(err => res.json(err))
})

// Get all personal growth entries for a user
app.get('/growth/:userId', (req, res) => {
    PersonalGrowthModel.find({userId: req.params.userId})
    .sort({date: -1})
    .then(entries => res.json(entries))
    .catch(err => res.json(err))
})

// ─────────────────────────────────────────────────────────────
app.listen(port, () => {
    console.log('Server running on port: ' + port);
});
