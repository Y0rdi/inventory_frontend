import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Avatar, Dropdown, Modal, Divider } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import { selectUserDetails } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import Orders from './PurchaseOrders'; // Orders Page
import Messages from './Messages'; // Messages Page
import '../../styles/ProcurementOfficer/ProcurementOfficer.css';

const { Header, Content, Footer, Sider } = Layout;

const SupplierLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  // User details from Redux
  const userDetails = useSelector(selectUserDetails);

  // Define color for the background
  const colorBgContainer = "#4CAF50";

  // Define the menu items
  const menuItems = [
    { key: '1', label: <Link to="/supplier/orders">Orders</Link> },
    { key: '2', label: <Link to="/supplier/messages">Messages</Link> },
  ];

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // User menu with customized dropdown displaying user info and logout
  const userMenu = (
    <div style={{
      width: 250,
      padding: '15px',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      textAlign: 'center'
    }}>
      <Avatar size={65} icon={<UserOutlined />} style={{ backgroundColor: '#4CAF50', color: 'white' }} />
      
      <div style={{ marginTop: 15, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 600, color: '#333' }}>Name:</span>
          <span style={{ fontWeight: 500, color: '#000', marginLeft: '10px' }}>{userDetails?.name || 'User'}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 600, color: '#333' }}>Email:</span>
          <span style={{ fontWeight: 500, color: '#000', marginLeft: '10px' }}>{userDetails?.email || 'N/A'}</span>
        </div>
      </div>

      <div
        onClick={handleLogout}
        style={{
          marginTop: 20,
          backgroundColor: '#f5222d',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
          padding: '10px',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <LogoutOutlined style={{ marginRight: 8 }} /> Logout
      </div>
    </div>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        className="Header"
        style={{
          position: 'fixed',
          width: '100%',
          zIndex: 1,
          backgroundColor: colorBgContainer,
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
        }}
      >
        <h2 style={{ margin: 0 }}>BBZ Foods Manufacturing S.C Promasidor Ethiopia</h2>
      </Header>

      <Layout style={{ marginTop: 64 }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            background: colorBgContainer,
            color: 'black',
            position: 'fixed',
            top: 64,
            bottom: 0,
            left: 0,
            zIndex: 2,
            width: '200px',
          }}
        >
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Dropdown overlay={userMenu} trigger={['click']}>
              <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <Avatar
                  size={40}
                  icon={<UserOutlined />}
                  style={{
                    backgroundColor: 'white',
                    border: '2px solid #4CAF50',
                    color: '#4CAF50',
                  }}
                />
              </div>
            </Dropdown>
          </div>

          <div style={{ padding: '16px', color: '#fff', fontSize: '20px', textAlign: 'center' }}>
            Supplier
          </div>

          {/* Add horizontal line */}
          <Divider style={{ borderColor: 'black', margin: '8px 0' }} />

          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
        </Sider>

        <Layout style={{ marginLeft: '200px' }}>
          <Content style={{ margin: '16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }} />
            <div style={{ padding: 24, minHeight: 360 }}>
              {/* Define the routes directly here */}
              <Routes>
                <Route path="/orders" element={<Orders />} />
                <Route path="/messages" element={<Messages />} />
              </Routes>
            </div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>

      <Modal
        title="User Profile"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <p><strong>Name:</strong> {userDetails?.name}</p>
        <p><strong>Email:</strong> {userDetails?.email}</p>
      </Modal>
    </Layout>
  );
};

export default SupplierLayout;
