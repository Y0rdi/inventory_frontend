import React from 'react';
//import '../../styles/ProcurementOfficer/Notifications.css';

const Notifications = () => {
    const notifications = [
        { id: 1, message: 'Pending approval for Item A' },
        { id: 2, message: 'Delivery update for Item B' },
      
    ];

    return (
        <div className="notifications-container">
            <h2 style={{ color: '#4caf50' }}>Notifications</h2>
            <ul className="notifications-list">
                {notifications.map(notification => (
                    <li key={notification.id}>{notification.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
