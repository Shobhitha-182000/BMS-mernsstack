import React, { useEffect, useState } from 'react';
import * as jwt_decode from 'jwt-decode';


const Dashboard = () => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            setUserName(decodedToken.name);  
        }
    }, []);

    return (
        <div>
            <h1>Welcome, {userName}!</h1>
        </div>
    );
};

export default Dashboard;
