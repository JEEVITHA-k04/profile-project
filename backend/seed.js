import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Profile from './models/Profile.js';
import connectDB from './config/database.js';

dotenv.config();

const sampleProfile = {
  name: 'Alex Johnson',
  bio: 'Full-stack developer passionate about creating elegant solutions to complex problems. I love building scalable applications and learning new technologies.',
  profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  socialLinks: {
    linkedin: 'https://linkedin.com/in/alexjohnson',
    github: 'https://github.com/alexjohnson',
    twitter: 'https://twitter.com/alexjohnson'
  },
  skills: [
    { name: 'JavaScript', endorsements: 0 },
    { name: 'React', endorsements: 0 },
    { name: 'Node.js', endorsements: 0 },
    { name: 'MongoDB', endorsements: 0 },
    { name: 'Express.js', endorsements: 0 },
    { name: 'Tailwind CSS', endorsements: 0 },
    { name: 'Git', endorsements: 0 },
    { name: 'REST APIs', endorsements: 0 }
  ]
};

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing profile
    await Profile.deleteMany({});
    console.log('Existing profiles deleted');

    // Create new profile
    const profile = await Profile.create(sampleProfile);
    console.log('Sample profile created:', profile);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
