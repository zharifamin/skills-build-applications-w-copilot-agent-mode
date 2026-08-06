import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: Number,
    fitnessGoal: String,
    location: String,
    role: { type: String, enum: ['admin', 'member', 'coach'], default: 'member' },
}, { timestamps: true });
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    sport: String,
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    focus: String,
    city: String,
}, { timestamps: true });
const activitySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: Number,
    distanceKm: Number,
    completedAt: { type: Date, default: Date.now },
}, { timestamps: true });
const leaderboardSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
    streak: Number,
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });
const workoutSchema = new Schema({
    title: { type: String, required: true },
    category: String,
    durationMinutes: Number,
    difficulty: { type: String, enum: ['easy', 'moderate', 'advanced'], default: 'moderate' },
    focus: String,
}, { timestamps: true });
export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
