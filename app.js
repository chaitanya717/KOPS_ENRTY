const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

const businessRoutes = require('./routes/business');
const entryRoutes = require("./routes/entrys")
app.get("/", (req, res) => {
    res.send(`
        <h1>Welcome to Agro Thresher Services</h1>
        <p>This is a simple CRUD application for managing agricultural services related to thresher machines.</p>
        <p><a href="/entries">View Entries</a></p>
        <p><a href="/business">View Businesses</a></p>
    `);
});

app.use('/api/businesses', businessRoutes);
app.use('/api/entries', entryRoutes);

mongoose.connect("mongodb+srv://chaudharichaitanya932:CWOzxmPtVtn8BnJ4@cluster0.b9hae.mongodb.net/KROPS?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(3000, () => console.log('Server is running on port 3000')))
    .catch(error => console.log(error.message));
