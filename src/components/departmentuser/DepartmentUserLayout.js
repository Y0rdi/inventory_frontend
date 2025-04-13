import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, Typography, Divider } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import PurchaseRequestForm from './PurchaseRequestForm';
import InventoryRequestForm from './InventoryRequestForm';
import RequestHistory from './RequestHistory';
import { selectUserDetails } from '../../redux/slices/authSlice'; // Import selector

const { Header, Content, Sider, Footer } = Layout;
const { Text } = Typography;

const DepartmentUserLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Get user details from Redux state
  const userDetails = useSelector(selectUserDetails);
  const username = userDetails?.name || ' ';

  const location = useLocation(); // Use location to track the route

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  // Custom user menu
  const userMenu = (
    <div
      style={{
        width: '220px',
        padding: '15px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        textAlign: 'center',
      }}
    >
      <Avatar
        size={65}
        icon={<UserOutlined />}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          marginBottom: '10px',
        }}
      />
      <div
        style={{
          marginTop: 15,
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 600, color: '#333' }}>Name:</span>
          <span style={{ fontWeight: 500, color: '#000', marginLeft: '10px' }}>
            {userDetails?.name || 'User'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 600, color: '#333' }}>Email:</span>
          <span style={{ fontWeight: 500, color: '#000', marginLeft: '10px' }}>
            {userDetails?.email || 'N/A'}
          </span>
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
          justifyContent: 'center',
        }}
      >
        <LogoutOutlined style={{ marginRight: 8 }} /> Logout
      </div>
    </div>
  );
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="Header" style={{
        position: 'fixed',
        width: '100%',
        zIndex: 1,
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '0 20px'
      }}>
        <h2 style={{ margin: 0, display: 'inline-block' }}>BBZ Foods Manufacturing S.C Promasidor Ethiopia</h2>
      </Header>

      <Layout style={{ marginTop: 64 }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ background: '#4CAF50', position: 'fixed', height: '100%', top: 64 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
            {/* Clickable User Avatar */}
            <Dropdown overlay={userMenu} placement="bottomCenter" trigger={["click"]}>
              <Avatar size={65} icon={<UserOutlined />} style={{ backgroundColor: 'white', color: '#4CAF50', border: '2px solid #fff', cursor: 'pointer' }} />
            </Dropdown>
            <Text style={{ color: 'white', fontWeight: 500, marginTop: 8 }}>{username}</Text>

            {/* Divider */}
            <Divider style={{ backgroundColor: 'black', width: '80%', margin: '12px 0' }} />

            {/* Sidebar Title */}
            <div style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>Department User</div>
          </div>

          <Menu theme="dark" mode="inline">
            <Menu.Item key="1" style={{ marginBottom: '15px' }}>
              <Link to="/department-user/request-item">Request Item</Link>
            </Menu.Item>
            <Menu.Item key="2" style={{ marginBottom: '15px' }}>
              <Link to="/department-user/inventory-request">Inventory Request</Link>
            </Menu.Item>
            <Menu.Item key="3" style={{ marginBottom: '15px' }}>
              <Link to="/department-user/request-history">Request History</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
          <Content style={{ margin: '16px' }}>
            <div style={{ padding: 0, minHeight: 360, marginTop: 0 }}>
              {location.pathname === '/department-user/request-item' && <PurchaseRequestForm />}
              {location.pathname === '/department-user/inventory-request' && <InventoryRequestForm />}
              {location.pathname === '/department-user/request-history' && <RequestHistory />}
            </div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            Department User ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DepartmentUserLayout;
