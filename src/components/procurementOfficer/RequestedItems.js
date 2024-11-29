// src/components/procurementOfficer/RequestedItems.js
import React, { useState } from 'react';
import { Table, Button, Modal, Input } from 'antd';

const RequestedItems = () => {
    const [requestedItems, setRequestedItems] = useState([
        { id: 1, name: 'Item A', quantity: 10, requestedBy: 'Department A', date: '2024-10-01' },
        { id: 2, name: 'Item B', quantity: 5, requestedBy: 'Department B', date: '2024-10-02' },
        // ... more items
    ]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [actionType, setActionType] = useState(null);
    const [supplier, setSupplier] = useState('');
    const [supplierDetails, setSupplierDetails] = useState('');

    const handleActionClick = (item, type) => {
        setSelectedItem(item);
        setActionType(type);
    };

    const handleConfirmAction = () => {
        if (actionType === 'Approve') {
            alert(`${selectedItem.name} approved! Sending details to ${supplier}.`);
            // Handle sending details to the supplier here
        } else {
            alert(`${selectedItem.name} declined.`);
        }
        resetModal();
    };

    const resetModal = () => {
        setSelectedItem(null);
        setActionType(null);
        setSupplier('');
        setSupplierDetails('');
    };

    const columns = [
        { title: 'Item Name', dataIndex: 'name', key: 'name' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Requested By', dataIndex: 'requestedBy', key: 'requestedBy' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        {
            title: 'Action',
            key: 'action',
            render: (text, item) => (
                <>
                    <Button
                        type="primary"
                        onClick={() => handleActionClick(item, 'Approve')}
                    >
                        Approve
                    </Button>
                    <Button
                        type="danger"
                        onClick={() => handleActionClick(item, 'Decline')}
                        style={{ marginLeft: '8px' }}
                    >
                        Decline
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <h2 style={{ color: '#4caf50' }}>Requested Items</h2>
            <Table
                dataSource={requestedItems}
                columns={columns}
                rowKey="id"
                pagination={false}
            />

            <Modal
                title={`${actionType} ${selectedItem ? selectedItem.name : ''}`}
                visible={!!selectedItem}
                onOk={handleConfirmAction}
                onCancel={resetModal}
            >
                {actionType === 'Approve' && (
                    <div>
                        <label>Supplier:</label>
                        <Input
                            value={supplier}
                            onChange={(e) => setSupplier(e.target.value)}
                            placeholder="Enter Supplier Name"
                        />
                        <label style={{ marginTop: '10px' }}>Supplier Details:</label>
                        <Input.TextArea
                            value={supplierDetails}
                            onChange={(e) => setSupplierDetails(e.target.value)}
                            placeholder="Enter details to send to the supplier"
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default RequestedItems;
