## **Project Description**

CodeColl is a collaborative code editing and project management platform. It allows multiple users to collaborate in real-time on code files with advanced features such as file versioning, permission-based access, activity logging, and AI-powered code suggestions. The platform ensures security and scalability with robust backend architecture and a user-friendly React-based frontend.

---

## **Features**

- **Real-Time Collaboration**: Supports multiple users editing files simultaneously.
- **Permission Management**: Fine-grained user access control for file editing, project management, and locking files.
- **Activity Logs**: Detailed logs of user actions for transparency and accountability.
- **AI Suggestions**: Provides code suggestions using OpenAI APIs.
- **File Versioning**: Tracks file versions with the ability to restore previous states.
- **User-Friendly Interface**: Intuitive and responsive design with dynamic elements.

---

## **Backend Routes**

### **Activity Logs**

| Method | Endpoint                                   | Description                                 | Status Codes |
|--------|-------------------------------------------|---------------------------------------------|--------------|
| GET    | `/activityLogs/project/:projectId`        | Get project activity logs                  | 200, 401     |
| GET    | `/activityLogs/user/:userId/activities`   | Get user-specific activity logs            | 200, 401     |
| GET    | `/activityLogs/overview/:projectId`       | Get activity overview for a project        | 200, 401     |
| POST   | `/activityLogs`                           | Add a new activity log                     | 201, 400     |
| POST   | `/activityLogs/file/edit/activity`        | Log file edit activity                     | 201, 400     |
| POST   | `/activityLogs/comment/activity`          | Log comment activity                       | 201, 400     |

### **Authentication**

| Method | Endpoint                                   | Description                                 | Status Codes |
|--------|-------------------------------------------|---------------------------------------------|--------------|
| POST   | `/auth/signin`                            | Sign in a user                              | 200, 400, 401|
| POST   | `/auth/signup`                            | Register a new user                         | 201, 400     |
| POST   | `/auth/refresh-token`                     | Refresh authentication token               | 200, 400     |
| POST   | `/auth/reset-password`                    | Reset user password                         | 200, 400     |
| POST   | `/auth/check-email-verification`          | Check email verification status            | 200, 400     |
| GET    | `/auth/verify-email/:id/:token`           | Verify email using token                   | 200, 400     |

### **Chat**

| Method | Endpoint                                   | Description                                 | Status Codes |
|--------|-------------------------------------------|---------------------------------------------|--------------|
| GET    | `/chat/session/:session_id`               | Get chat by session                        | 200, 401     |
| GET    | `/chat/session/:session_id/user/:user_id` | Get user-specific chat in a session        | 200, 401     |
| POST   | `/chat`                                   | Send a message                             | 201, 400     |

### **Collaboration Sessions**

| Method | Endpoint                                   | Description                                 | Status Codes |
|--------|-------------------------------------------|---------------------------------------------|--------------|
| POST   | `/collaboration/:project_id`              | Start a new collaboration session          | 201, 400     |
| GET    | `/collaboration/active/:project_id`       | Get active sessions for a project          | 200, 401     |
| GET    | `/collaboration/all/:project_id`          | Get all sessions for a project             | 200, 401     |
| PUT    | `/collaboration/end/:session_id`          | End a collaboration session                | 200, 400     |

### **File Change Events**

| Method | Endpoint                                   | Description                                 | Status Codes |
|--------|-------------------------------------------|---------------------------------------------|--------------|
| POST   | `/file-change-events`                     | Log a file change event                    | 201, 400     |
| GET    | `/file-change-events/session/:session_id` | Get events for a session                   | 200, 401     |
| GET    | `/file-change-events/:file_id`            | Get events for a file                      | 200, 401     |

### **Files**

| Method | Endpoint                                   | Description                                 | Status Codes |
|--------|-------------------------------------------|---------------------------------------------|--------------|
| GET    | `/files/:fileId`                          | Get file details                           | 200, 404     |
| GET    | `/files/project/:projectId`               | Get files for a project                    | 200, 401     |
| POST   | `/files/:projectId`                       | Create a new file                          | 201, 400     |
| PUT    | `/files/:fileId`                          | Update file content                        | 200, 400     |
| PUT    | `/files/lock/:fileId`                     | Lock a file                                | 200, 403     |
| PUT    | `/files/unlock/:fileId`                   | Unlock a file                              | 200, 403     |
| DELETE | `/files/:fileId`                          | Delete a file                              | 200, 404     |

### **File Versions**

| Method | Endpoint                                   | Description                                 | Status Codes |
|--------|-------------------------------------------|---------------------------------------------|--------------|
| GET    | `/file-versions/:fileId`                  | Get versions for a file                    | 200, 401     |
| GET    | `/file-versions/latest/:fileId`           | Get the latest version of a file           | 200, 401     |
| POST   | `/file-versions/:fileId`                  | Create a new version                       | 201, 400     |
| PUT    | `/file-versions/restore/:fileId/:versionId`| Restore a file version                     | 200, 400     |

### **Invitations**

| Method | Endpoint                                   | Description                                 | Status Codes |
|--------|-------------------------------------------|---------------------------------------------|--------------|
| GET    | `/invitations/:inviterId`                 | Get invitations sent by a user             | 200, 401     |
| GET    | `/invitations/pending`                    | Get all pending invitations                | 200, 401     |
| GET    | `/invitations/user/:inviteeId`            | Get pending invitations for a user         | 200, 401     |
| POST   | `/invitations`                            | Send a new invitation                      | 201, 400     |
| PUT    | `/invitations/:invitationId/respond`      | Respond to an invitation                   | 200, 400     |
| DELETE | `/invitations/:invitationId`              | Cancel an invitation                       | 200, 404     |

### **Projects**

| Method | Endpoint                                   | Description                                 | Status Codes |
|--------|-------------------------------------------|---------------------------------------------|--------------|
| GET    | `/projects/:id`                           | Get project details by ID                  | 200, 404     |
| GET    | `/projects/search/:term`                  | Search projects by term                    | 200, 401     |
| GET    | `/projects/user/:userId`                  | Get projects for a user                    | 200, 401     |
| GET    | `/projects/overview/:id`                  | Get project overview                       | 200, 401     |
| GET    | `/projects/archived`                      | Get archived projects                      | 200, 401     |
| POST   | `/projects/duplicate/:id`                 | Duplicate a project                        | 201, 400     |
| POST   | `/projects`                               | Create a new project                       | 201, 400     |
| PUT    | `/projects/:id`                           | Update a project                           | 200, 400     |
| PUT    | `/projects/archive/:id`                   | Archive a project                          | 200, 400     |
| PUT    | `/projects/restore/:id`                   | Restore an archived project                | 200, 400     |
| DELETE | `/projects/:id`                           | Delete a project                           | 200, 404     |

### **Users**

| Method | Endpoint                                   | Description                                 | Status Codes |
|--------|-------------------------------------------|---------------------------------------------|--------------|
| GET    | `/users/:id`                              | Get user details by ID                     | 200, 404     |
| GET    | `/users`                                  | Get all users                              | 200, 401     |
| GET    | `/users/search/email`                     | Search users by email                      | 200, 401     |
| GET    | `/users/search/:term`                     | Search users by username                   | 200, 401     |
| GET    | `/users/profile/:id`                      | Get user profile details                   | 200, 404     |
| PUT    | `/users/:id`                              | Update user profile                        | 200, 400     |
| PUT    | `/users/changeEmail/:id`                  | Change user email                          | 200, 400     |
| PUT    | `/users/bio/:id`                          | Update user bio                            | 200, 400     |
| PUT    | `/users/skills/:id`                       | Update user skills                         | 200, 400     |
| PUT    | `/users/change-password/:id`              | Change user password                       | 200, 400     |
| PUT    | `/users/profile-pic/:id`                  | Update profile picture                     | 200, 400     |
| DELETE | `/users/:id`                              | Delete user                                | 200, 404     |

---

## **Database Diagram**

### **PostgreSQL Tables**
1. **Users**: Contains user account details and profile information.
    - **Columns**: `id`, `username`, `email`, `password_hash`, `profile_pic`, `bio`, `skills`, `confermation_token` ,`created_at`, `updated_at`.

2. **Projects**: Stores project metadata.
    - **Columns**: `id`, `project_name`, `description`, `owner_id`, `created_at`, `updated_at`, `archived`.

3. **Files**: Maintains project-related files.
    - **Columns**: `id`, `project_id`, `filename`, `content`, `locked_by`, `created_at`, `updated_at`.

4. **Activity Logs**: Tracks user actions across the platform.
    - **Columns**: `id`, `user_id`, `project_id`, `action`, `timestamp`.

5. **File Versions**: Tracks versions of files for version control.
    - **Columns**: `id`, `file_id`, `version_number`, `content_snapshot`, `created_at`.

6. **Invitations**: Manages project invitations sent by project owners to collaborators.
    - **Columns**: `id`, `project_id`, `inviter_id`, `invitee_id`, `status`, `message`, `created_at`.

7. **Project Collaborators**: Stores information about collaborators for a project, including their roles and permissions.
    - **Columns**: `id`, `project_id`, `user_id`, `role`, `permissions`, `added_at`.

### **MongoDB Collections**
1. **Collaboration Sessions**: Tracks real-time collaboration metadata.
2. **Chats**: Stores chat messages for project discussions.
3. **File Change Events**: Logs changes made to files during collaboration.


---

## **Libraries Used**

### **Frontend**
- **[React.js](https://react.dev/)**: For building the user interface.
- **[React Router DOM](https://reactrouter.com/)**: For navigation and routing.
- **[Monaco Editor](https://microsoft.github.io/monaco-editor/)**: Advanced code editor.
- **[Axios](https://axios-http.com/)**: For API calls.
- **[Framer Motion](https://www.framer.com/motion/)**: For animations.
- **[Socket.IO Client](https://socket.io/)**: For real-time features.
- **[zxcvbn](https://www.npmjs.com/package/zxcvbn)**: For checking password strength.
  
### **Backend**
- **[Express.js](https://expressjs.com/)**: Web server framework.
- **[Sequelize](https://sequelize.org/)**: ORM for PostgreSQL.
- **[Mongoose](https://mongoosejs.com/)**: ODM for MongoDB.
- **[JWT](https://jwt.io/)**: For authentication and authorization.
- **[Bcrypt.js](https://github.com/dcodeIO/bcrypt.js/)**: For password hashing.
- **[Nodemailer](https://nodemailer.com/)**: For sending emails.
- **[OpenAI API](https://openai.com/api/)**: For AI-powered code suggestions.
- **[Multer](https://www.npmjs.com/package/multer)**: For handling file uploads.


---

## **Database Diagram Diagram**
![DBDiagram](https://github.com/user-attachments/assets/58546644-d90d-4380-bb6a-91ac40b005c1)

## **How to Start**

Follow the steps below to set up and run the project:

### **Backend Setup**
1. Navigate to the backend directory:
   ```bash
   cd backend
   npm install
   npx nodemon index
   cd ../frontend
   npm install
   npm start
   
   Access the Application

    After completing the setup, the frontend will run on http://localhost:3000, and the backend will run on http://localhost:5000 (or the port specified in your .env file).


## **Use Case Scenario**

### **Scenario: User Login and Project Collaboration**

1. **Actor**: Registered User.
2. **Preconditions**: 
   - The user is registered and verified.
   - The user has been assigned to at least one project or has permissions to create a project.
3. **Steps**:
   1. The user navigates to the login page and enters their credentials (username and password).
   2. The backend validates the credentials and generates a JSON Web Token (JWT).
   3. The user is redirected to their dashboard, which displays:
      - All active projects they own or collaborate on.
      - A summary of recent activity logs.
      - Pending invitations.
   4. The user selects a project to open.
   5. Based on permissions:
      - If the user has `can_edit` permissions, they can edit files.
      - If the user has `can_manage_collaborators`, they can invite collaborators.
      - If the user has no edit or manage permissions, they can only view project details.
   6. Any actions (editing files, locking files, posting activity logs) are recorded in the activity logs.
4. **Postconditions**:
   - The system logs actions in the activity logs table.
   - Collaboration sessions and permissions are respected.

---

## **Context Diagram**

### **Context Diagram for User Login and Project Collaboration**

```plaintext
  +-------------------------+
  |                         |
  |         User            |
  |                         |
  +-----------+-------------+
              |
              | 1. Login request with credentials
              v
  +-----------+-------------+
  |                         |
  |    Authentication       |
  |   (JWT Generation)      |
  |                         |
  +-----------+-------------+
              |
              | 2. Redirect with JWT
              v
  +-----------+-------------+
  |                         |
  |     User Dashboard      |
  |                         |
  +-----------+-------------+
              |
              | 3. Select project
              v
  +-----------+-------------+
  |                         |
  |    Backend Services     |
  |   (Projects, Files,     |
  |   Permissions, etc.)    |
  +-----------+-------------+
              |
              | 4. Fetch or update project data
              v
  +-----------+-------------+
  |                         |
  |   PostgreSQL / MongoDB  |
  |                         |
  +-------------------------
```
## Images
![Screenshot 2025-03-01 at 14-53-25 React App](https://github.com/user-attachments/assets/15c14d7c-3008-4048-bcad-a1c5936c270c)
![Screenshot 2025-03-01 at 14-53-25 React App](https://github.com/user-attachments/assets/bc82d8ba-f666-4eb3-b2bb-7cabe8b7fce9)
![Screenshot 2025-03-01 at 14-53-32 React App](https://github.com/user-attachments/assets/adbbfcf4-e5d7-4db6-bf04-cd567c944f82)
![Screenshot 2025-03-01 at 14-57-01 React App](https://github.com/user-attachments/assets/08e13cee-6822-4f50-803a-fea254f29ffd)
![Screenshot 2025-03-01 at 14-56-50 React App](https://github.com/user-attachments/assets/dfab3328-0999-4167-8a3e-5b2be5bd2d82)
![Screenshot 2025-03-01 at 14-54-38 React App](https://github.com/user-attachments/assets/8078d3ea-cc60-48fe-bf78-eb5d6d309ea9)
![Screenshot 2025-03-01 at 14-58-05 React App](https://github.com/user-attachments/assets/1904e6b4-9370-4ac2-9c45-b34bc90990bd)
![Screenshot 2025-03-01 at 15-00-06 React App](https://github.com/user-attachments/assets/15d3aa02-aa6f-4d73-be31-e8e9607b8c9d)
![Screenshot 2025-03-01 at 15-02-18 React App](https://github.com/user-attachments/assets/dc8ef306-6991-4788-aba5-274215beecb8)
![Screenshot 2025-03-01 at 15-02-27 React App](https://github.com/user-attachments/assets/37cb09b0-4458-4f7d-b510-9efe16145293)
![Screenshot 2025-03-01 at 15-04-14 React App](https://github.com/user-attachments/assets/48812a2d-f6d2-4b13-8424-94d397340af2)
![Screenshot 2025-03-01 at 15-04-29 React App](https://github.com/user-attachments/assets/035be2a7-ad21-4f7f-8e45-1bb8b98225f0)
