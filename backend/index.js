require('dotenv').config();
require('./association');
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
const authenicationRoutes = require('../backend/routes/authenticationRoutes');

require('./src/User/user');
require('./src/Project/project');
require('./src/ProjectCollaborator/projectCollaborators');
require('./src/File/file');


sequelize.sync().then(() => {
    console.log('Database synced and associations loaded.');
}).catch((err) => {
    console.error('Error syncing database:', err);
});
app.use(cors());
app.use(express.json());



app.get('/CodeColl', (req, res) => {
    res.send('Welcome');
});

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/files', fileRoutes);
app.use('/project/collaborator', projectCollaboratorRoutes);
app.use('/file/version', fileVersionRoutes);
app.use('/invitation', invitationRoutes);
app.use('/acitivtylog', activtyLogRoutes);
app.use('/chats', chatsRoutes);
app.use('/file/change', fileChangeEventRoutes);
app.use('/collaboration/session', collaborationSessionRoutes);
app.use('/auth', authenicationRoutes);

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
