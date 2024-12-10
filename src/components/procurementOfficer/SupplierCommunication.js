import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../redux/slices/supplierSlice';

const SupplierCommunication = () => {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.supplier);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sendMessage(message)); // Dispatch the sendMessage action
        setMessage(''); // Clear the textarea after sending
    };

    return (
        <div className="supplier-communication-container">
            <h2 style={{ color: '#4caf50' }}>Communicate with Suppliers</h2>
            {status === 'loading' && <p>Sending message...</p>}
            {status === 'failed' && <p style={{ color: 'red' }}>Error: {error}</p>}
            {status === 'succeeded' && <p style={{ color: 'green' }}>Message sent successfully!</p>}

            <form onSubmit={handleSubmit}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    required
                />
                <button type="submit" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    );
};

export default SupplierCommunication;
