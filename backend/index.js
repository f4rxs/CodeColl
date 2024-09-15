require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const {sequelize, connectMongoDB} = require('./config/database/database');
const userRoutes = require('../backend/routes/userRoutes');

app.use(cors());
app.use(express.json());



app.get('/CodeColl', (req, res) => {
    res.send('Welcome');
});

app.use('/CodeColl',userRoutes);

sequelize.authenticate()
    .then(() => {
        console.log('PostgreSQL connected');
    })
    .catch(err => {
        console.error('Unable to connect to PostgreSQL:', err);
    });


connectMongoDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
