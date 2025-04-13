import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConfirmedOrders } from '../../redux/slices/confirmedslice';  // Adjust the path as needed
import { Table, Button, message } from 'antd';
import { markOrderAsDelivered } from '../../redux/slices/confirmedByPoSlice';  // Import the async thunk

const ConfirmedOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.confirmed);  // Ensure 'orders' contains 'orderID'

  useEffect(() => {
    dispatch(fetchConfirmedOrders());
  }, [dispatch]);

  const handleDelivered = async (orderID) => {
    try {
      // Dispatch the async thunk to mark the order as delivered
      const actionResult = await dispatch(markOrderAsDelivered(orderID));
      
      // Check for errors from the action result
      if (actionResult.error) {
        message.error(`Failed to mark Order ${orderID} as delivered: ${actionResult.error.message}`);
      } else {
        message.success(`Order ${orderID} marked as delivered.`);
      }
    } catch (error) {
      message.error(`Error: ${error.message}`);
    }
  };

  const handleRefresh = () => {
    dispatch(fetchConfirmedOrders());
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const columns = [
    {
      title: 'Item',
      dataIndex: 'itemDetails',
      key: 'itemDetails',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleDelivered(record.orderID)} // Use record.orderID instead of record.id
        >
          Delivered
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1>Confirmed Orders</h1>
      <Button
        type="default"
        onClick={handleRefresh}
        style={{ marginBottom: '16px' }}
      >
        Refresh
      </Button>
      <Table
        dataSource={orders} // Ensure orders from Redux state include 'orderID'
        columns={columns}
        rowKey="orderID"  // Use 'orderID' as the unique key for each row
        loading={loading}
        pagination={false}
      />
    </div>
  );
};

export default ConfirmedOrders;
