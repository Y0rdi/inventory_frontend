// src/components/procurementOfficer/RequestedItems.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRequestedItems, approveItem, declineItem } from '../../redux/slices/requestedItemsSlice';

const RequestedItems = () => {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state) => state.requestedItems);

    const [selectedItem, setSelectedItem] = useState(null);
    const [actionType, setActionType] = useState(null);
    const [supplier, setSupplier] = useState('');
    const [supplierDetails, setSupplierDetails] = useState('');

    // Fetch requested items on component mount
    useEffect(() => {
        dispatch(fetchRequestedItems());
    }, [dispatch]);

    const handleActionClick = (item, type) => {
        setSelectedItem(item);
        setActionType(type);
    };

    const handleConfirmAction = () => {
        if (actionType === 'Approve') {
            dispatch(approveItem({ id: selectedItem.id, supplier, supplierDetails }));
        } else if (actionType === 'Decline') {
            dispatch(declineItem(selectedItem.id));
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
            {loading ? (
                <Spin tip="Loading items..." />
            ) : (
                <Table
                    dataSource={items}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                />
            )}

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
