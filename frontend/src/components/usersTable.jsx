import React, { useEffect, useState } from "react";
import axios from "../http-common";

const Users = () => {
    const [users, setUsers] = useState([]);  // Initialize with an empty array

    useEffect(() => {
        getUsers();  // Call the function when the component loads
    }, []);

    const getUsers = async () => {
        try {
            const res = await axios.get('/users');
            if (res.status === 200) {
                setUsers(res.data);  
            } else {
                alert('Failed to fetch users');
            }
        }
        catch (e) {
            console.error('Failed to fetch users', e);
        }
    }

    return (
        <>
            <h2>User List</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Profile Picture</th>
                        <th>Bio</th>
                        <th>Skills</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 ? (
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.profile_pic ? (
                                        <img src={user.profile_pic} alt="Profile" width="50" height="50" />
                                    ) : (
                                        "No picture"
                                    )}
                                </td>
                                <td>{user.bio ? user.bio : "No bio available"}</td>
                                <td>
                                    {user.skills && user.skills.length > 0 ? (
                                        <ul>
                                            {user.skills.map((skill, index) => (
                                                <li key={index}>{skill}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        "No skills listed"
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default Users;