// src/components/Admin/AdminUserManagement.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, Select, Typography, message, Form, Spin } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, updateSystemAdmin, deleteUser } from '../../redux/slices/userSlice';
import '../../styles/UserManagement.css';

const { Title } = Typography;
const { Option } = Select;

const AdminUserManagement = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.user);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm(); // Use Ant Design's form instance

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
    console.log("Redux Users:", users); // Log the users from Redux
  }, [dispatch, status, users]); // Ensure 'users' is in the dependency array

  // Open modal and reset form
  const openModal = (user = null) => {
    setIsEditing(!!user);
    setIsModalVisible(true);
    form.setFieldsValue(user || { name: '', email: '', phone: '', address: '', role: '', status: '', userID: '' });
  };

  // Submit handler
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Submitting user data:", values); // Check if all necessary data is being passed
  
      if (isEditing) {
        const updatedUser = { ...values, userID: values.userID };  // Ensure userID is correctly added
        await dispatch(updateSystemAdmin(updatedUser)).unwrap();
        message.success('User updated successfully');
      } else {
        await dispatch(addUser(values)).unwrap();
        message.success('User added successfully');
      }
      setIsModalVisible(false);
    } catch (err) {
      console.error('Error submitting user:', err);  // Log error to console for more detail
      message.error(err.response?.data?.message || 'Failed to save user');
    }
  };
  

  // Delete user
  const handleRemoveClick = async (userID) => {
    try {
      await dispatch(deleteUser(userID)).unwrap();
      message.success('User removed successfully');
      console.log("user id", userID);
    } catch (err) {
      message.error('Failed to remove user');
    }
  };

  // Refresh users
  const handleRefresh = () => {
    dispatch(fetchUsers());
  };

  // Table columns
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => openModal(record)} style={{ marginRight: 8 }}>Edit</Button>
          <Button icon={<DeleteOutlined />} onClick={() => handleRemoveClick(record.userID)} danger>Remove</Button>
        </>
      ),
    },
  ];

  return (
    <div className="user-management-container">
      <Title level={2} style={{ color: '#4caf50' }}>User Management</Title>

      <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()} style={{ marginBottom: 16 }}>
        Add User
      </Button>

      <Button type="default" icon={<ReloadOutlined />} onClick={handleRefresh} style={{ marginBottom: 16, marginLeft: 8 }}>
        Refresh
      </Button>

      {status === 'loading' ? (
        <Spin size="large" />
      ) : status === 'failed' ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        <Table
          dataSource={users}
          columns={columns}
          rowKey="userID"  // Ensure this matches your API field (userID)
          pagination={{ pageSize: 10 }}
          className="user-table"
        />
      )}

      {/* Modal for Adding/Editing User */}
      <Modal
        title={isEditing ? 'Edit User' : 'Add New User'}
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
        okText={isEditing ? 'Update User' : 'Add User'}
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="userID" hidden>
            <Input />
          </Form.Item>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter name' }]}>
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter email' }]}>
            <Input type="email" placeholder="Enter email" />
          </Form.Item>
          <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please enter phone number' }]}>
            <Input placeholder="Enter phone" />
          </Form.Item>
          <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please enter address' }]}>
            <Input placeholder="Enter address" />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please select role' }]}>
            <Select placeholder="Select role">
              <Option value="Procurement Officer">Procurement Officer</Option>
              <Option value="Inventory Manager">Inventory Manager</Option>
              <Option value="Supplier">Supplier</Option>
              <Option value="Warehouse Staff">Warehouse Staff</Option>
              <Option value="Quality Inspection Officer">Quality Inspection Officer</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select status' }]}>
            <Select placeholder="Select status">
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

export default AdminUserManagement;
