import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Layout, Menu, Dropdown, Avatar, Typography } from 'antd';
import { DashboardOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { selectUserDetails } from '../../redux/slices/authSlice';

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);  // State to control dropdown visibility
  const navigate = useNavigate();
  const userDetails = useSelector(selectUserDetails);

  const colorBgContainer = "#4CAF50";  
  const headerBgColor = "#4CAF50";    

  const menuItems = [
    { key: '1', label: <Link to="/admin/dashboard">Dashboard</Link>, icon: <DashboardOutlined /> },
    { key: '2', label: <Link to="/admin/user-management">User Management</Link>, icon: <UserOutlined /> },
    { key: '3', label: <Link to="/admin/supplier-management">Suppliers</Link>, icon: <SettingOutlined /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('Token');
    navigate('/login');
  };
  const userMenu = (
    <div style={{
      width: '220px', // Reduced width to make it thinner
      padding: '15px',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      textAlign: 'center',
      minHeight: '100px',
      height:'auto',
      marginLeft: '50px' // Added margin to the right
    }}>
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
        style={{
          position: 'fixed',
          width: '100%',
          zIndex: 1,
          backgroundColor: headerBgColor,
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '20px' }}>BBZ Foods Manufacturing S.C Promasidor Ethiopia</h2>
      </Header>

      <Layout style={{ marginTop: 64 }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ position: 'fixed', left: 0, top: 64, bottom: 0, background: colorBgContainer }}
        >
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              style={{
                backgroundColor: 'white',
                color: '#4CAF50',
                marginBottom: '15px',
                borderRadius: '50%',
                cursor: 'pointer'  // Makes the avatar clickable
              }}
              onClick={() => setDropdownVisible(!dropdownVisible)}  // Toggles dropdown visibility on avatar click
            />
            {dropdownVisible && (
              <Dropdown overlay={userMenu} trigger={['click']} visible={dropdownVisible} onVisibleChange={setDropdownVisible} placement="bottomCenter">
                <div style={{ cursor: 'pointer' }} />
              </Dropdown>
            )}
            <hr style={{ border: '1px solid black', margin: '10px 0' }} />
            <Text strong style={{ color: '#F4F4F4', fontSize: '18px' }}>Admin Panel</Text>
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} style={{ backgroundColor: colorBgContainer }} />
        </Sider>

        <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
          <Content style={{ margin: '16px' }}>
            <div style={{ padding: 24, minHeight: 360 }}>
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
