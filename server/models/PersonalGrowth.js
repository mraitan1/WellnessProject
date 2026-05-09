const mongoose = require('mongoose');

const PersonalGrowthSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    date: String,
    goals: [
        {
            text: String,
            done: Boolean
        }
    ],
    habits: [String],
    progress: {
        label: String,
        emoji: String
    },
    note: String
});

const PersonalGrowthModel = mongoose.model('personalgrowths', PersonalGrowthSchema);

module.exports = PersonalGrowthModel;