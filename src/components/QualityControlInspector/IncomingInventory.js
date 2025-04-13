import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInspectionOrders, inspectOrder } from '../../redux/slices/inspectionOrdersSlice'; // Import the inspectOrder action
import { Table, Spin, Alert, Button, Modal, Input } from 'antd';

const InspectionOrdersList = () => {
  const dispatch = useDispatch();

  // Accessing the orders, loading, and error state from the Redux store
  const { orders, loading, error } = useSelector((state) => state.inspectionOrders);

  // Local state to manage modal visibility and selected order
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [inspectionNote, setInspectionNote] = useState('');
  const [inspectionStatus, setInspectionStatus] = useState(null);

  // Dispatching the action to fetch inspection orders when the component mounts
  useEffect(() => {
    dispatch(fetchInspectionOrders());
  }, [dispatch]);

  // Show loading state while data is being fetched
  if (loading) return <Spin size="large" />;

  // Show error message if there is an issue with the API request
  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  // Define the columns for the table (excluding the "Order ID" column)
  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'itemDetails',  // Assuming `itemName` is available in the order data
      key: 'itemDetails',
    },
    {
      title: 'Quality Inspection Status',
      dataIndex: 'qualityInspectionStatus',
      key: 'qualityInspectionStatus',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" onClick={() => handleInspect(record)}>
          Inspect
        </Button>
      ),
    },
  ];

  // Handle the "Inspect" button click
  const handleInspect = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true); // Open the modal
    setInspectionNote(''); // Reset note field
    setInspectionStatus(null); // Reset inspection status
  };

  // Handle modal close
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle approve or decline action
  const handleApproval = (status) => {
    if (!selectedOrder) return; // Ensure selectedOrder is not null

    // Dispatch the inspectOrder action to update the order status
    dispatch(inspectOrder({
      orderID: selectedOrder.orderID,
      status: status, // 'approved' or 'declined'
      note: inspectionNote,
    }));

    setInspectionStatus(status);
    setIsModalVisible(false); // Close the modal after action
  };

  // Define the modal content
  const inspectionModal = (
    <Modal
      title="Inspection"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <div>
        <div style={{ marginTop: 16 }}>
          <h3>Inspection Note:</h3>
          <Input.TextArea
            value={inspectionNote}
            onChange={(e) => setInspectionNote(e.target.value)}
            rows={4}
            placeholder="Add your inspection notes here"
          />
        </div>
        <div style={{ marginTop: 16 }}>
          <Button
            type="primary"
            onClick={() => handleApproval('approved')}
            style={{ marginRight: 8 }}
          >
            Approve
          </Button>
          <Button
            type="danger"
            onClick={() => handleApproval('declined')}
          >
            Decline
          </Button>
        </div>
      </div>
    </Modal>
  );

  // Handle refresh button click to re-fetch the inspection orders
  const handleRefresh = () => {
    dispatch(fetchInspectionOrders());
  };

  return (
    <div>
      <h1>Inspection Orders</h1>
      <Button type="default" onClick={handleRefresh} style={{ marginBottom: 16 }}>
        Refresh
      </Button>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="orderID"
        pagination={false}
        bordered
      />
      {inspectionModal}
    </div>
  );
};

export default InspectionOrdersList;
