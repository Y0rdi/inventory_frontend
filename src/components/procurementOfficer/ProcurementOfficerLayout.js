import React, { useState } from 'react';
import { Layout, Avatar, Dropdown, Menu, Typography } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserDetails } from '../../redux/slices/authSlice';
import { getPendingRequests } from '../../redux/slices/pendingRequestsSlice';
import { Link } from 'react-router-dom';
import '../../styles/ProcurementOfficer/ProcurementOfficer.css';

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

const ProcurementOfficerLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const { pendingCount } = useSelector((state) => state.pendingRequests);
  const userDetails = useSelector(selectUserDetails);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Dropdown menu
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

  const menuItems = [
    { key: '1', label: <Link to="/procurement-officer/">Requested Items</Link> },
    {
      key: '2',
      label: (
        <Link to="/procurement-officer/notifications">
          Notifications
          {pendingCount > 0 && (
            <span
              style={{
                backgroundColor: '#f44336',
                color: '#fff',
                padding: '2px 8px',
                borderRadius: '50%',
                fontSize: '12px',
                marginLeft: '8px',
              }}
            >
              {pendingCount}
            </span>
          )}
        </Link>
      ),
    },
    { key: '3', label: <Link to="/procurement-officer/supplier-communication">Supplier Communication</Link> },
    { key: '4', label: <Link to="/procurement-officer/confirmed-orders">Confirmed Orders</Link> },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header
        style={{
          position: 'fixed',
          width: '100%',
          zIndex: 1,
          backgroundColor: '#4CAF50',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '20px' }}>BBZ Foods Manufacturing S.C Promasidor Ethiopia</h2>

      </Header>

      <Layout style={{ marginTop: 64 }}>
        {/* Sidebar */}
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            position: 'fixed',
            left: 0,
            top: 64,
            bottom: 0,
            backgroundColor: '#4CAF50',
            color: 'black',
          }}
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
                cursor: 'pointer',
              }}
              onClick={() => setDropdownVisible(!dropdownVisible)}
            />
            {dropdownVisible && (
              <Dropdown overlay={userMenu} trigger={['click']} visible={dropdownVisible} onVisibleChange={setDropdownVisible} placement="bottomCenter">
                <div style={{ cursor: 'pointer' }} />
              </Dropdown>
            )}
            <hr style={{ border: '1px solid black', margin: '10px 0' }} />
            <Text strong style={{ color: '#F4F4F4', fontSize: '18px' }}>
              Procurement Officer
            </Text>
          </div>

          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{ backgroundColor: '#4CAF50' }}>
            {menuItems.map((item) => (
              <Menu.Item key={item.key} icon={<UserOutlined />}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>

        {/* Content Area */}
        <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
          <Content style={{ margin: '16px' }}>
            <div style={{ padding: 24, minHeight: 360 }}>{children}</div>
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
