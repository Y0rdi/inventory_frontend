// src/components/warehouse/WarehouseLayout.js
import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Modal } from 'antd';
import { DatabaseOutlined, FileSyncOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import LogIncomingItems from './LogIncomingInventory';
import InternalTransfers from './InternalTransfers';
import { Link, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserDetails } from '../../redux/slices/authSlice'; // Import the selector for user data
import '../../styles/ProcurementOfficer/ProcurementOfficer.css';

const { Header, Sider, Content } = Layout;

const WarehouseLayout = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Get user details from the Redux store
  const userDetails = useSelector(selectUserDetails);
  const username = userDetails?.name || 'Guest';  // If no name, default to 'Guest'
  const email = userDetails?.email || 'No email available';  // Default if no email is available

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const showProfile = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" onClick={showProfile}>Profile</Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        className='Header'
        style={{
          position: 'fixed',
          width: '100%',
          zIndex: 1,
          backgroundColor: '#4CAF50',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
        }}
      >
        <h2>Warehouse Staff</h2>
        <Dropdown overlay={userMenu} trigger={['click']}>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#ffffff', color: '#000' }} />
            <span style={{ marginLeft: 10, color: 'white' }}>{username}</span>
          </div>
        </Dropdown>
      </Header>

      <Layout style={{ marginTop: 64 }}>
        <Sider collapsible>
          <Menu theme="dark" defaultSelectedKeys={['log-incoming-items']} mode="inline" style={{ paddingTop: '20px' }}>
            <Menu.Item key="log-incoming-items" icon={<DatabaseOutlined />}>
              <Link to="log-incoming-items">Log Incoming Items</Link>
            </Menu.Item>
            <Menu.Item key="internal-transfers" icon={<FileSyncOutlined />}>
              <Link to="internal-transfers">Internal Transfers</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Content style={{ margin: '16px', padding: 24, background: '#fff', minHeight: 360 }}>
          <Routes>
            <Route path="log-incoming-items" element={<LogIncomingItems />} />
            <Route path="internal-transfers" element={<InternalTransfers />} />
          </Routes>
        </Content>
      </Layout>

      {/* Profile Modal */}
      <Modal title="User Profile" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <strong>Name:</strong> {username}
        </div>
        <div>
          <strong>Email:</strong> {email}
        </div>
      </Modal>
    </Layout>
  );
};

export default WarehouseLayout;
