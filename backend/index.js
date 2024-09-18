require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { sequelize, connectMongoDB } = require('./config/database/database');
const userRoutes = require('../backend/routes/userRoutes');
const projectRoutes = require('../backend/routes/projectRoutes');
const fileRoutes = require('../backend/routes/fileRoutes');
const projectCollaboratorRoutes = require('../backend/routes/projectCollaboratorRoutes');
const fileVersionRoutes = require('../backend/routes/fileVersionRoutes');
const invitationRoutes = require('../backend/routes/invitationRoutes');
const activtyLogRoutes = require('../backend/routes/activityLogRoutes');
const chatsRoutes = require('../backend/routes/chatRoutes');
const fileChangeEventRoutes = require('../backend/routes/fileChangeEventRoutes');
const collaborationSessionRoutes = require('../backend/routes/collaborationSessionRoutes');
app.use(cors());
app.use(express.json());



app.get('/CodeColl', (req, res) => {
    res.send('Welcome');
});

app.use('/CodeColl', userRoutes);
app.use('/CodeColl', projectRoutes);
app.use('/CodeColl', fileRoutes);
app.use('/CodeColl', projectCollaboratorRoutes);
app.use('/CodeColl', fileVersionRoutes);
app.use('/CodeColl', invitationRoutes);
app.use('/CodeColl', activtyLogRoutes);
app.use('/CodeColl', chatsRoutes);
app.use('/CodeColl', fileChangeEventRoutes);
app.use('/CodeColl', collaborationSessionRoutes);
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
