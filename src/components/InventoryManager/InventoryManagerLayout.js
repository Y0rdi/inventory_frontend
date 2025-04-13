import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Layout, Menu, Dropdown, Avatar, Typography } from 'antd';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { BarChartOutlined, SwapOutlined, ReconciliationOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { selectUserDetails } from '../../redux/slices/authSlice';
import InventoryDashboard from './InventoryDashboard';
import InventoryMovements from './InventoryMovements';
import InventoryAudit from './InventoryAudit';
import '../../styles/ProcurementOfficer/ProcurementOfficer.css'; // Your custom styles

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const ProcurementOfficerLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const userDetails = useSelector(selectUserDetails);

  const handleLogout = () => {
    localStorage.removeItem('Token');
    navigate('/login');
  };

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
      {/* Header */}
      <Header style={{
        position: 'fixed',
        width: '100%',
        zIndex: 1,
        backgroundColor: '#4CAF50',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        minHeight:'80px'
      }}>
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
            top: 80,
            bottom: 0,
            background: '#4CAF50'
          }}
        >
          {/* User Avatar and Title */}
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              style={{
                backgroundColor: 'white',
                color: '#4CAF50',
                marginBottom: '15px',
                borderRadius: '50%',
                cursor: 'pointer'
              }}
              onClick={() => setDropdownVisible(!dropdownVisible)}
            />
            {dropdownVisible && (
              <Dropdown overlay={userMenu} trigger={['click']} visible={dropdownVisible} onVisibleChange={setDropdownVisible} placement="bottomCenter">
                <div style={{ cursor: 'pointer' }} />
              </Dropdown>
            )}
            <hr style={{ border: '1px solid black', margin: '10px 0' }} />
            <Text strong style={{ color: '#F4F4F4', fontSize: '18px' }}>Inventory Manager</Text>
          </div>

          {/* Sidebar Menu */}
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{ backgroundColor: '#4CAF50' }}>
            <Menu.Item key="1" icon={<BarChartOutlined />}>
              <Link to="inventory-dashboard">Inventory Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<SwapOutlined />}>
              <Link to="inventory-movements">Inventory Movements</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<ReconciliationOutlined />}>
              <Link to="inventory-audit">Inventory Audits & Reconciliations</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        {/* Content Area */}
        <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
          <Content style={{ margin: '16px' }}>
            <Routes>
              <Route path="inventory-dashboard" element={<InventoryDashboard />} />
              <Route path="inventory-movements" element={<InventoryMovements />} />
              <Route path="inventory-audit" element={<InventoryAudit />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ProcurementOfficerLayout;
