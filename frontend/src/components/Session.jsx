import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import collaborationSessionService from '../services/collaborationSessionService';
import userService from '../services/userSerivce';
import { useSocket } from '../Context/SocketContext';
import '../styles/Session.css';

const SessionPage = () => {
    const { projectId, sessionId } = useParams();
    const [sessionDetails, setSessionDetails] = useState(null);
    const [activeUsers, setActiveUsers] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { joinSession, leaveSession, sendMessage, messages: socketMessages } = useSocket();
    const navigate = useNavigate();
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const userId = loggedUser?.id;
    useEffect(() => {
        const fetchSessionDetails = async () => {
            try {
                const response = await collaborationSessionService.getSessionById(sessionId);
                console.log(response.active_users);
                setSessionDetails(response);
                setActiveUsers(response.active_users || []);
            } catch (error) {
                console.error('Error fetching session details:', error);
            }
        };

        fetchSessionDetails();
        joinSession(sessionId);

     

    }, [sessionId, joinSession, leaveSession, userId]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (activeUsers.length > 0) {
                try {
                    const userResponse = await userService.getUserByIds(activeUsers);
                    console.log("Users from fetching: ", userResponse);

                    const userMap = userResponse.reduce((map, user) => {
                        map[user.id] = user.username; 
                        return map;
                    }, {});

                    setUserDetails(userMap);
                } catch (error) {
                    console.error("Error fetching user details: ", error);
                }
            }
        };

        fetchUserDetails();
    }, [activeUsers]); 


    useEffect(() => {
        setMessages(socketMessages);
    }, [socketMessages]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            sendMessage(sessionId, newMessage);
            setNewMessage('');
        }
    };




    return (
        <div className="session-page">
            <header className="session-header">
                <h2>Session</h2>
                <button onClick={() => navigate(`/projects/${projectId}`)} className="back-button">
                    Back to Project
                </button>
            </header>

            <div className="session-container">
                <aside className="active-users">
                    <h3>Active Users</h3>
                    <ul>
                        {[...new Set(activeUsers)].map((user) => (
                            <li key={user}>
                                {user === userId ? 'You' : userDetails[user] || `User ${user}`}
                            </li>
                        ))}
                    </ul>
                </aside>

                <main className="session-main">
                    <section className="chat-section">
                        <h3>Chat</h3>
                        <div className="chat-messages">
                            {messages.map((msg, index) => {
                                return (
                                    <div key={index} className={`chat-message ${msg.user_id === userId ? 'self' : ''}`}>
                                        <strong>{msg.user_id === userId ? 'You' : userDetails[msg.user_id] || `User ${msg.user_id}`}:</strong>
                                        <span>{msg.message}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="chat-input">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <button onClick={handleSendMessage}>Send</button>
                        </div>
                    </section>

                    
                </main>
            </div>
        </div>
    );
};

export default SessionPage;
