const mongoose = require('mongoose')

const WorkoutTypeSchema = new mongoose.Schema({
    name:String
})

const WorkoutJournalSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'users', required:true},
    types:[WorkoutTypeSchema],
    duration:{type:Number, required:true},
    intensity:{type:String, required:true},
    notes:{type:String, default:''},
    date:{type:Date, default:Date.now}
})

const WorkoutJournalModel = mongoose.model("workoutjournals", WorkoutJournalSchema)

module.exports = WorkoutJournalModel