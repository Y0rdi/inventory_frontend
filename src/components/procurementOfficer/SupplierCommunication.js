import React, { useState } from 'react';
//import '../../styles/ProcurementOfficer/SupplierCommunication.css';

const SupplierCommunication = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle sending message logic here
        alert('Message sent: ' + message);
        setMessage('');
    };

    return (
        <div className="supplier-communication-container">
            <h2 style={{ color: '#4caf50' }}>Communicate with Suppliers</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    required
                />
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default SupplierCommunication;
