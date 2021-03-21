const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const users = require('./routes/users');
const plants = require('./routes/plants');
const plantconditions = require('./routes/plantconditions');
const config = require('./config/db');
const port = 5000;

mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('connected to mongoDB: ' + config.database);
});
mongoose.connection.on('error', (err) => {
    console.log('db connection error: ' + err);
})

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', users);
app.use('/plants', plants);
app.use('./plantconditions', plantconditions);

app.get('/', (req, res) => {
    res.send('nothing to see here');
})

app.listen(port, () => {
    console.log('Server started on port: ' + port);
})