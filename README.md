# The Profile Project

A full-stack MERN application that replicates a modern professional profile page with an interactive Skill Endorsement System.

This project demonstrates end-to-end development including database design, REST API architecture, and a responsive frontend built with Tailwind CSS.

# Live Demo

Frontend: <Your Vercel URL>
Backend API: <Your Render URL>/api/profile

# Tech Stack
Frontend
- React (Vite)
- Tailwind CSS
- Axios
- ES6 (Arrow functions + async/await)

Backend
- Node.js
- Express.js
- REST API architecture
- ES Modules ("type": "module")

Database
- MongoDB Atlas
- Mongoose ODM

# Core Features

- Profile display (Name, Bio, Profile Picture, Social Links)

- Fully responsive UI

- Edit mode to update profile

- Data persistence using MongoDB

- RESTful API integration

# Innovation Feature – Skill Endorsement System

The key innovation in this project is a dynamic Skill Endorsement System.

Each skill:

- Displays endorsement count
- Includes an "Endorse" button
- Updates count instantly
- Persists data in MongoDB

Why This Feature?

Instead of a static profile page, this system introduces interaction and engagement.
It simulates real-world platforms like LinkedIn, where skills gain credibility through endorsements.

From a technical perspective, this required:
- Embedded subdocuments in MongoDB
- PATCH route for atomic updates
- Mongoose subdocument handling
- Real-time UI updates

# Project Structure

profile-project/
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json

# Local Setup
1. Backend
cd backend
npm install

Create .env file:

MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development

Start backend:

npm run dev

2. Frontend

cd frontend
npm install
npm run dev

Frontend runs on: http://localhost:3000

# API Endpoints

| Method | Endpoint                        | Description    |
| ------ | ------------------------------- | -------------- |
| GET    | `/api/profile`                  | Fetch profile  |
| PUT    | `/api/profile`                  | Update profile |
| PATCH  | `/api/profile/endorse/:skillId` | Endorse skill  |

# Technical Highlights

- Clean separation of concerns (MVC pattern)
- Modular folder structure
- Proper error handling
- Optimistic UI updates
- Persistent MongoDB storage
- Production-ready deployment setup