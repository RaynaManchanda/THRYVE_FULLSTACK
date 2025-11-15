# THRYVE_FULLSTACK – Full-Stack Fitness & Wellness Platform
THRYVE is a full-stack fitness and wellness application built using Node.js, Express, MongoDB, and a modern frontend. The app allows users to register, log in, track workouts, track sleep, and manage their fitness journey with clean UI and smooth functionality.

## Features
### User Authentication
- Register new users  
- Login with email & password  
- Password hashing for security  

### Workout Tracking
- Add new workouts  
- View all logged workouts  
- Stored in MongoDB  

### Sleep Tracking
- Add sleep logs  
- View sleep history  

### Database Integration
- MongoDB database  
- Mongoose models for validation  

### Frontend UI
- Clean and simple design  
- Login, Register, Dashboard pages  

## Tech Stack
**Frontend:** HTML, CSS, JavaScript  
**Backend:** Node.js, Express.js  
**Database:** MongoDB, Mongoose  
**Tools:** VS Code, Git, GitHub

## Project Structure
THRYVE_FULLSTACK/
│── public/ # CSS, images
│── views/ # Frontend pages
│── src/
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Express routes
│ └── controllers/ # Logic
│── server.js # Main backend file
│── package.json
│── README.md


## How to Run the Project
### 1. Clone the repository
git clone https://github.com/RaynaManchanda/THRYVE_FULLSTACK.git
cd THRYVE_FULLSTACK

### 2. Install dependencies
npm install

### 3. Start MongoDB  
Ensure MongoDB is running locally.

### 4. Start the server
node server.js

Runs at:
http://localhost:3000

## API Endpoints
### Authentication
| Method | Endpoint   | Description |
|--------|------------|-------------|
| POST   | /register  | Register user |
| POST   | /login     | Login user |

### Workouts
| Method | Endpoint      | Description |
|--------|----------------|-------------|
| POST   | /workout/add   | Add workout |
| GET    | /workout/all   | Get all workouts |

### Sleep
| Method | Endpoint    | Description |
|--------|--------------|-------------|
| POST   | /sleep/add   | Add sleep log |
| GET    | /sleep/all   | View sleep logs |

## Future Improvements
- Diet tracking  
- Habit tracker  
- Analytics dashboard  
- Notifications / reminders  

## Contributors
Rayna Manchanda
Saarthak Malik
Purvi Aneja
