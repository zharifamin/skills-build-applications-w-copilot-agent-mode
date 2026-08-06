import express from 'express';
import cors from 'cors';
import './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';
const app = express();
const port = Number(process.env.PORT || 8000);
// Use a Codespaces URL when available and fall back to localhost otherwise.
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(cors());
app.use(express.json());
app.get(['/api/health', '/api/health/'], (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', baseUrl });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await User.find().lean();
    res.json(users);
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await Team.find().populate('members').lean();
    res.json(teams);
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await Activity.find().populate('user').lean();
    res.json(activities);
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const leaderboard = await LeaderboardEntry.find().populate('user').lean();
    res.json(leaderboard);
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await Workout.find().lean();
    res.json(workouts);
});
app.listen(port, () => {
    console.log(`OctoFit backend listening on ${baseUrl}`);
});
