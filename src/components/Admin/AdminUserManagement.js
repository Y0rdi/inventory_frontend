// src/components/Admin/AdminUserManagement.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, Select, Typography, message, Form } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import '../../styles/UserManagement.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, updateUser, deleteUser } from '../../redux/slices/userSlice';

const { Title } = Typography;
const { Option } = Select;

const AdminUserManagement = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.user);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null, name: '', email: '', phone: '', address: '', role: '' });

  // Fetch users on component mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  // Handle add/edit user form submission
  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await dispatch(updateUser(currentUser)).unwrap();
        message.success('User updated successfully');
      } else {
        await dispatch(addUser(currentUser)).unwrap();
        message.success('User added successfully');
      }
      resetForm();
    } catch (err) {
      console.error('Error during submit:', err); 
      message.error('Failed to save user');
    }
  };

  const resetForm = () => {
    setCurrentUser({ id: null, name: '', email: '', phone: '', address: '', role: '' });
    setIsModalVisible(false);
    setIsEditing(false);
  };

  // Function to handle edit button click for a specific user
  const handleEditClick = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  // Function to handle remove button click for a specific user
  const handleRemoveClick = async (userId) => {
    try {
      await dispatch(deleteUser(Number(userId))).unwrap();
      message.info('User removed successfully');
    } catch (err) {
      message.error('Failed to remove user');
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
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
      <Title level={2} style={{ color: '#4caf50' }}>User Management</Title>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          resetForm();
          setIsModalVisible(true);
        }}
        style={{ marginBottom: 16 }}
      >
        Add User
      </Button>

      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'failed' ? (
        <p>Error: {error}</p>
      ) : (
        <Table
          dataSource={users}
          columns={columns}
          rowKey="id"
          pagination={false}
          className="user-table"
        />
      )}

      <Modal
        title={isEditing ? 'Edit User' : 'Add New User'}
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={resetForm}
        okText={isEditing ? 'Update User' : 'Add User'}
        cancelText="Cancel"
      >
        <Form layout="vertical">
          <Form.Item label="Name" required>
            <Input
              value={currentUser.name}
              onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
              placeholder="Enter name"
            />
          </Form.Item>
          <Form.Item label="Email" required>
            <Input
              type="email"
              value={currentUser.email}
              onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
              placeholder="Enter email"
            />
          </Form.Item>
          <Form.Item label="Phone" required>
            <Input
              value={currentUser.phone}
              onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })}
              placeholder="Enter phone"
            />
          </Form.Item>
          <Form.Item label="Address" required>
            <Input
              value={currentUser.address}
              onChange={(e) => setCurrentUser({ ...currentUser, address: e.target.value })}
              placeholder="Enter address"
            />
          </Form.Item>
          <Form.Item label="Role" required>
            <Select
              value={currentUser.role}
              onChange={(value) => setCurrentUser({ ...currentUser, role: value })}
              placeholder="Select role"
            >
              <Option value="Procurement Officer">Procurement Officer</Option>
              <Option value="Inventory Manager">Inventory Manager</Option>
              <Option value="Supplier">Supplier</Option>
              <Option value="Warehouse Staff">Warehouse Staff</Option>
              <Option value="Quality Inspection Officer">Quality Inspection Officer</Option>
              <Option value="Finance Officer">Finance Officer</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminUserManagement;
