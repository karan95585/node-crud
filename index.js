const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const authRoutes = require('./routes/auth');
const protectedRoute = require('./routes/protectedRoute');

 // Replace with your MongoDB connection URL
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const con = mongoose.connection;

app.use(express.json());



app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);

try {
    con.on('open', () => {
        console.log('Connected to the database');
    })
} catch (error) {
    console.log("Error: " + error);
}


app.listen(process.env.PORT, () => {
    console.log('Server started on port ' + process.env.PORT);
});