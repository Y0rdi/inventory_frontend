// src/components/Admin/AdminInventorySettings.js
import React, { useState } from 'react';
import { Table, Button, Modal, Input, Typography, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
//import '../../styles/AdminInventorySettings.css';

const { Title } = Typography;

const AdminInventorySettings = () => {
  const [inventory, setInventory] = useState([
    { key: '1', name: 'Soya Bean', threshold: 100 },
    { key: '2', name: 'Oil', threshold: 100 },
    { key: '3', name: 'Film', threshold: 100 },
    { key: '4', name: 'Seasoning', threshold: 100 },
  ]);

  const [selectedInventory, setSelectedInventory] = useState(null);
  const [newThreshold, setNewThreshold] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (name, currentThreshold) => {
    setSelectedInventory(name);
    setNewThreshold(currentThreshold);
    setIsModalVisible(true);
  };

  const handleUpdateThreshold = () => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.name === selectedInventory ? { ...item, threshold: newThreshold } : item
      )
    );
    message.success(`Inventory threshold updated to ${newThreshold}`);
    setIsModalVisible(false);
    setSelectedInventory(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedInventory(null);
  };

  const columns = [
    {
      title: 'Inventory Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Current Threshold',
      dataIndex: 'threshold',
      key: 'threshold',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button
          icon={<EditOutlined />}
          onClick={() => showModal(record.name, record.threshold)}
        >
          Change Threshold
        </Button>
      ),
    },
  ];

  return (
    <div className="dashboard-content">
      <Title level={2} style={{ color: '#4caf50' }}>Inventory Settings</Title>
      
      <Table
        dataSource={inventory}
        columns={columns}
        pagination={false}
        className="inventory-table"
        style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px' }}
      />

      <Modal
        title={`Change Threshold for ${selectedInventory}`}
        visible={isModalVisible}
        onOk={handleUpdateThreshold}
        onCancel={handleCancel}
        okText="Update"
        cancelText="Cancel"
      >
        <Input
          type="number"
          value={newThreshold}
          onChange={(e) => setNewThreshold(e.target.value)}
          placeholder="Enter new threshold"
        />
      </Modal>
    </div>
  );
};

export default AdminInventorySettings;
