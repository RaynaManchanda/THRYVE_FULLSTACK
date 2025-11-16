const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const indexRoutes = require('./routes/index');
const workoutRoutes = require('./routes/workouts');
const recoveryRoutes = require('./routes/recovery');
const UserRoutes = require('./routes/users');


const app = express();

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/thryve_dev';
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error', err));

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use('/', indexRoutes);
app.use('/workouts', workoutRoutes);
app.use('/recovery', recoveryRoutes);
const loginRoutes = require('./routes/login');
app.use('/login', loginRoutes);
app.use('/users', UserRoutes);


app.use((req,res)=> res.status(404).send('Not Found'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Server running on', PORT));

