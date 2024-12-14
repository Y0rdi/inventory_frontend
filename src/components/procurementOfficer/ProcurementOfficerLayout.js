import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons'; // Import UserOutlined
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../styles/ProcurementOfficer/ProcurementOfficer.css';

const { Header, Content, Footer, Sider } = Layout;

const ProcurementOfficerLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const colorBgContainer = "#4CAF50";

  const menuItems = [
    { key: '1', label: <Link to="/procurement-officer/">Requested Items</Link> },
    { key: '2', label: <Link to="/procurement-officer/notifications">Notifications</Link> },
    { key: '3', label: <Link to="/procurement-officer/supplier-communication">Supplier Communication</Link> },
    { key: '4', label: <Link to="/procurement-officer/generate-report">Generate Report</Link> },
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Procurement Officer</h2>
        </div>

        {/* Avatar on the right side with white background and circular border */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Dropdown overlay={userMenu} trigger={['click']}>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Avatar
                size={40}
                icon={<UserOutlined />}
                style={{
                  backgroundColor: 'white', // White background
                  border: '2px solid #4CAF50', // Green border for the circular effect
                  color: '#4CAF50', // Green icon color
                }}
              />
            </div>
          </Dropdown>
        </div>
      </Header>

      <Layout style={{ marginTop: 64 }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            background: colorBgContainer,
            color: 'black',
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
        </Sider>

        <Layout>
          <Content style={{ margin: '16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }} />
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

export default ProcurementOfficerLayout;
