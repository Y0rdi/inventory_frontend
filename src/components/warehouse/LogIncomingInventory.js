import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncomingInventory, logItemToInventory } from '../../redux/slices/incomingInventorySlice'; // Import the action
import { Table, Spin, Alert, Button, Modal, Form, Input } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const LogIncomingInventory = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.incomingInventory);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchIncomingInventory());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchIncomingInventory()); // Refresh data
  };

  const columns = [
    { title: 'Supplier', dataIndex: 'supplierName', key: 'supplierName', render: () => 'Abebe Alemu' }, 
    { title: 'Item Name', dataIndex: 'itemDetails', key: 'itemDetails' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button 
          onClick={() => showModal(record)} 
          type="primary" 
          disabled={record.status === 'Logged'} // Disable button if already logged
        >
          Log Item
        </Button>
      ),
    },
  ];

  const showModal = (order) => {
    setSelectedOrder({ ...order, supplierName: 'Abebe Alemu' });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (selectedOrder) {
      const { orderID, quantity } = selectedOrder;
      dispatch(logItemToInventory({ orderID, deliveredQuantity: quantity }));
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFormChange = (changedValues) => {
    setSelectedOrder({
      ...selectedOrder,
      ...changedValues,
    });
  };

  if (loading) return <Spin size="large" style={{ display: 'block', margin: 'auto', marginTop: '20px' }} />;

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon style={{ maxWidth: 400, margin: '20px auto' }} />;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h2>Incoming Inventory</h2>
        <Button type="primary" icon={<ReloadOutlined />} onClick={handleRefresh}>
          Refresh
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={orders.map((order) => ({ ...order, supplierName: 'Abebe Alemu' }))}
        rowKey="id"
        bordered
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Log Inventory Item"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} 
      >
        <Form layout="vertical" initialValues={selectedOrder} onValuesChange={onFormChange}>
          <Form.Item label="Order ID" name="orderID">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Supplier Name" name="supplierName">
            <Input disabled value="Abebe Alemu" />
          </Form.Item>

          <Form.Item label="Quantity" name="quantity">
            <Input disabled value={selectedOrder?.quantity} />
          </Form.Item>

          <Form.Item label="Item Details" name="itemDetails">
            <Input disabled value={selectedOrder?.itemDetails} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={handleOk} block>
              Log Item
            </Button>
            <Button onClick={handleCancel} block style={{ marginTop: '10px' }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LogIncomingInventory;
