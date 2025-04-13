// src/components/Admin/AdminUserManagement.js
import React, { useState } from 'react';
import { Table, Button, Modal, Input, Select, Typography, message, Form } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'; // Import ReloadOutlined icon
import '../../styles/UserManagement.css';

const { Title } = Typography;
const { Option } = Select;

const AdminSupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Abebe Melaku', email: 'abebe.melaku@gmail.com', phone: '0923451455', address: 'AA', role: 'Supplier', status: 'Active' },
    { id: 2, name: 'Selam Ayalew', email: 'selam.ayalew@gmail.com', phone: '0987654321', address: 'Adama', role: 'Supplier', status: 'Active' }
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState({ id: null, name: '', email: '', phone: '', address: '', role: '', status: '' });

  const handleSubmit = () => {
    if (isEditing) {
      // Update existing supplier
      setSuppliers(prevSuppliers => prevSuppliers.map(supplier =>
        supplier.id === currentSupplier.id ? currentSupplier : supplier
      ));
      message.success('Supplier updated successfully');
    } else {
      // Add new supplier
      const newSupplier = { ...currentSupplier, id: suppliers.length + 1 }; // Assign a new ID
      setSuppliers([...suppliers, newSupplier]);
      message.success('Supplier added successfully');
    }
    resetForm();
  };

  const resetForm = () => {
    setCurrentSupplier({ id: null, name: '', email: '', phone: '', address: '', role: '', status: '' });
    setIsModalVisible(false);
    setIsEditing(false);
  };

  const handleEditClick = (supplier) => {
    setCurrentSupplier(supplier); // Ensure currentSupplier has the supplier ID for update
    setIsEditing(true); // Mark the action as editing
    setIsModalVisible(true); // Open the modal
  };

  // Function to handle remove button click for a specific supplier
  const handleRemoveClick = (supplierId) => {
    setSuppliers(prevSuppliers => prevSuppliers.filter(supplier => supplier.id !== supplierId));
    message.info('Supplier removed successfully');
  };

  const handleRefresh = () => {
    // Simulate refresh (in a real scenario, it would fetch updated data)
    message.info('Refreshed');
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    { title: 'Status', dataIndex: 'status', key: 'status' }, // Added Status column
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => handleEditClick(record)} style={{ marginRight: 8 }}>Edit</Button>
          <Button icon={<DeleteOutlined />} onClick={() => handleRemoveClick(record.id)} danger>Remove</Button>
        </>
      ),
    },
  ];

  return (
    <div className="user-management-container">
      <Title level={2} style={{ color: '#4caf50' }}>Supplier Management</Title>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          resetForm();
          setIsModalVisible(true);
        }}
        style={{ marginBottom: 16 }}
      >
        Add Supplier
      </Button>

      <Button
        type="default"
        icon={<ReloadOutlined />}
        onClick={handleRefresh} // Trigger refresh when clicked
        style={{ marginBottom: 16, marginLeft: 8 }}
      >
        Refresh
      </Button>

      <Table
        dataSource={suppliers}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="user-table"
      />

      <Modal
        title={isEditing ? 'Edit Supplier' : 'Add New Supplier'}
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={resetForm}
        okText={isEditing ? 'Update Supplier' : 'Add Supplier'}
        cancelText="Cancel"
      >
        <Form layout="vertical">
          <Form.Item label="Name" required>
            <Input
              value={currentSupplier.name}
              onChange={(e) => setCurrentSupplier({ ...currentSupplier, name: e.target.value })}
              placeholder="Enter name"
            />
          </Form.Item>
          <Form.Item label="Email" required>
            <Input
              type="email"
              value={currentSupplier.email}
              onChange={(e) => setCurrentSupplier({ ...currentSupplier, email: e.target.value })}
              placeholder="Enter email"
            />
          </Form.Item>
          <Form.Item label="Phone" required>
            <Input
              value={currentSupplier.phone}
              onChange={(e) => setCurrentSupplier({ ...currentSupplier, phone: e.target.value })}
              placeholder="Enter phone"
            />
          </Form.Item>
          <Form.Item label="Address" required>
            <Input
              value={currentSupplier.address}
              onChange={(e) => setCurrentSupplier({ ...currentSupplier, address: e.target.value })}
              placeholder="Enter address"
            />
          </Form.Item>
          <Form.Item label="Role" required>
            <Select
              value={currentSupplier.role}
              onChange={(value) => setCurrentSupplier({ ...currentSupplier, role: value })}
              placeholder="Select role"
            >
              <Option value="Supplier">Supplier</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Status" required>
            <Select
              value={currentSupplier.status}
              onChange={(value) => setCurrentSupplier({ ...currentSupplier, status: value })}
              placeholder="Select status"
            >
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
              <Option value="Suspended">Suspended</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminSupplierManagement;
