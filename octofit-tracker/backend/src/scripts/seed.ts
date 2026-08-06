import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Chen',
        email: 'ava.chen@example.com',
        age: 29,
        fitnessGoal: 'Marathon prep',
        location: 'Seattle',
        role: 'admin',
      },
      {
        name: 'Noah Patel',
        email: 'noah.patel@example.com',
        age: 34,
        fitnessGoal: 'Strength training',
        location: 'Austin',
        role: 'member',
      },
      {
        name: 'Mina Alvarez',
        email: 'mina.alvarez@example.com',
        age: 27,
        fitnessGoal: 'Cycling endurance',
        location: 'Denver',
        role: 'coach',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Rocket Riders',
        sport: 'Cycling',
        members: [users[0]._id, users[1]._id],
        focus: 'Endurance',
        city: 'Seattle',
      },
      {
        name: 'Peak Performers',
        sport: 'CrossFit',
        members: [users[1]._id, users[2]._id],
        focus: 'Strength',
        city: 'Austin',
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'run',
        durationMinutes: 45,
        distanceKm: 7.8,
      },
      {
        user: users[1]._id,
        type: 'strength',
        durationMinutes: 60,
        distanceKm: 0,
      },
      {
        user: users[2]._id,
        type: 'cycling',
        durationMinutes: 90,
        distanceKm: 25,
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        user: users[0]._id,
        score: 980,
        rank: 1,
        streak: 7,
      },
      {
        user: users[1]._id,
        score: 912,
        rank: 2,
        streak: 4,
      },
      {
        user: users[2]._id,
        score: 894,
        rank: 3,
        streak: 6,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Morning Mobility',
        category: 'mobility',
        durationMinutes: 20,
        difficulty: 'easy',
        focus: 'Recovery',
      },
      {
        title: 'Interval Cardio',
        category: 'cardio',
        durationMinutes: 35,
        difficulty: 'moderate',
        focus: 'Stamina',
      },
      {
        title: 'Power Strength',
        category: 'strength',
        durationMinutes: 50,
        difficulty: 'advanced',
        focus: 'Power',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
