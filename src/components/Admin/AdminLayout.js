import React, { useState, useEffect } from 'react';
import { Layout, Menu, Dropdown, Avatar, Typography, Spin, message } from 'antd';
import { DashboardOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import { jwtDecode } from 'jwt-decode';

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState({ name: 'User', email: 'user@example.com' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const colorBgContainer = "#4CAF50";

  const menuItems = [
    { key: '1', label: <Link to="/admin/dashboard">Dashboard</Link>, icon: <DashboardOutlined /> },
    { key: '2', label: <Link to="/admin/user-management">User Management</Link>, icon: <UserOutlined /> },
    { key: '3', label: <Link to="/admin/inventory-settings">Inventory Settings</Link>, icon: <SettingOutlined /> },
  ];




// User menu for logout
const userMenu = (
  <Menu>
    <Menu.Item
      key="logout"
      onClick={() => {
        // Remove the token and redirect to login
        localStorage.removeItem('Token');
        navigate('/login'); // Redirect to login page
      }}
    >
      Logout
    </Menu.Item>
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
          backgroundColor: colorBgContainer,
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
        }}
      >
        <h2 style={{ margin: 0 }}>Admin Panel</h2>
        <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
          <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              style={{ backgroundColor: '#fff', color: '#4CAF50', marginRight: '8px' }}
            />
            <Text style={{ color: 'white' }}>{userData.name}</Text>
          </div>
        </Dropdown>
      </Header>

      <Layout style={{ marginTop: 64 }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ background: colorBgContainer, color: 'black' }}
        >
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
        </Sider>

        <Layout>
          <Content style={{ margin: '16px' }}>
            <div style={{ padding: 24, minHeight: 360 }}>
              {children}
            </div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
