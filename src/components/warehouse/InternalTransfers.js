import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../redux/slices/internalWarehouseSlice'; // Updated import for your slice
import { Table, Spin, Alert } from 'antd'; // Import Ant Design components

const OrdersComponent = () => {
  const dispatch = useDispatch();

  // Access orders from the Redux store
  const { orders, loading, error } = useSelector((state) => state.internalWarehouse); // Update selector to match the new slice

  // Fetch orders on component mount
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Define table columns
  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'reqitem',
      key: 'reqitem',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Requested By',
      dataIndex: 'requestedBy',
      key: 'requestedBy',
      render: () => 'Beza', // Set the value to "Beza" for every row
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          {/* Add any action buttons or links here */}
          <a href={`#order-${record.id}`} style={{ marginRight: 8 }}>
            Mark as processed
          </a>
          {/* You can add more actions as needed */}
        </span>
      ),
    },
  ];

  // Render component
  return (
    <div>
      <h1>Orders to be Delivered</h1>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      )}
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: 20 }}
        />
      )}
      {!loading && !error && orders.length === 0 && (
        <Alert
          message="No Orders"
          description="There are currently no orders to be delivered."
          type="info"
          showIcon
          style={{ marginBottom: 20 }}
        />
      )}
      {!loading && !error && orders.length > 0 && (
        <Table
          dataSource={orders}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }} // Optional pagination
        />
      )}
    </div>
  );
};

export default OrdersComponent;
