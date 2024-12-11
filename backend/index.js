require('dotenv').config();
require('./association');

const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');
const socketManager = require('./sockets/socketManager');

const app = express();

const server = http.createServer(app); // Create an HTTP server

const io = socketIO(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });


const { sequelize, connectMongoDB } = require('./config/database/database');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const fileRoutes = require('./routes/fileRoutes');
const projectCollaboratorRoutes = require('./routes/projectCollaboratorRoutes');
const fileVersionRoutes = require('./routes/fileVersionRoutes');
const invitationRoutes = require('./routes/invitationRoutes');
const activtyLogRoutes = require('./routes/activityLogRoutes');
const chatsRoutes = require('./routes/chatRoutes');
const fileChangeEventRoutes = require('./routes/fileChangeEventRoutes');
const collaborationSessionRoutes = require('./routes/collaborationSessionRoutes');
const authenicationRoutes = require('./routes/authenticationRoutes');
const judge0Routes = require('./routes/judge0Routes');
const aiRoutes = require('./routes/aiRoutes');

require('./src/User/user');
require('./src/Project/project');
require('./src/ProjectCollaborator/projectCollaborators');
require('./src/File/file');

app.use(cors());
app.use(express.json());

socketManager(io);

sequelize.sync().then(() => {
    console.log('Database synced and associations loaded.');
}).catch((err) => {
    console.error('Error syncing database:', err);
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
app.use('/judge0',judge0Routes);
app.use('/ai',aiRoutes);

sequelize.authenticate()
    .then(() => {
        console.log('PostgreSQL connected');
    })
    .catch(err => {
        console.error('Unable to connect to PostgreSQL:', err);
    });


connectMongoDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
