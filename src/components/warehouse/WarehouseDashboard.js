// src/components/warehouse/WarehouseLayout.js
import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Modal } from 'antd';
import { DatabaseOutlined, FileSyncOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserDetails } from '../../redux/slices/authSlice';
import LogIncomingItems from './LogIncomingInventory';
import InternalTransfers from './InternalTransfers';
import '../../styles/ProcurementOfficer/ProcurementOfficer.css';

const { Header, Sider, Content, Footer } = Layout;

const WarehouseLayout = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Get user details from Redux
  const userDetails = useSelector(selectUserDetails);
  const username = userDetails?.name || 'Guest';
  const email = userDetails?.email || 'No email available';

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  // Show profile modal
  const showProfile = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Dropdown menu
  const userMenu = (
    <Menu>
      <Menu.Item key="profile" onClick={showProfile}>Profile</Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        className="Header"
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
        <h2 style={{ margin: 0 }}>Warehouse Staff</h2>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', position: 'absolute', right: 20 }}>
          <Dropdown overlay={userMenu} trigger={['click']}>
            <Avatar size={40} icon={<UserOutlined />} style={{ backgroundColor: 'white', border: '2px solid #4CAF50', color: '#4CAF50', cursor: 'pointer' }} />
          </Dropdown>
          <span style={{ marginLeft: 10, color: 'white' }}>{username}</span>
        </div>
      </Header>

      <Layout style={{ marginTop: 64 }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ background: '#4CAF50' }}>
          <Menu theme="dark" defaultSelectedKeys={['log-incoming-items']} mode="inline">
            <Menu.Item key="log-incoming-items" icon={<DatabaseOutlined />}>
              <Link to="log-incoming-items">Log Incoming Items</Link>
            </Menu.Item>
            <Menu.Item key="internal-transfers" icon={<FileSyncOutlined />}>
              <Link to="internal-transfers">Internal Transfers</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Content style={{ margin: '16px', padding: 24, background: '#fff', minHeight: 360 }}>
            <Routes>
              <Route path="log-incoming-items" element={<LogIncomingItems />} />
              <Route path="internal-transfers" element={<InternalTransfers />} />
            </Routes>
          </Content>

          <Footer style={{ textAlign: 'center' }}>Warehouse Staff ©{new Date().getFullYear()}</Footer>
        </Layout>
      </Layout>

      {/* Profile Modal */}
      <Modal title="User Profile" visible={isModalVisible} onCancel={handleCancel} footer={null}>
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
