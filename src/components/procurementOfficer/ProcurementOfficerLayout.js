// src/components/procurementOfficer/ProcurementOfficerLayout.js
import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  PieChartOutlined,
  BellOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
// Ensure you have header styles
import '../../styles/ProcurementOfficer/ProcurementOfficer.css'; // Your procurement officer styles

const { Header, Content, Footer, Sider } = Layout;

const ProcurementOfficerLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const colorBgContainer = "#4CAF50"; // Same color as admin layout

  const menuItems = [
    { key: '1', label: <Link to="/procurement-officer/">Requested Items</Link>, icon: <PieChartOutlined /> },
    { key: '2', label: <Link to="/procurement-officer/notifications">Notifications</Link>, icon: <BellOutlined /> },
    { key: '3', label: <Link to="/procurement-officer/supplier-communication">Supplier Communication</Link>, icon: <FileOutlined /> },
    { key: '4', label: <Link to="/procurement-officer/generate-report">Generate Report</Link>, icon: <FileOutlined /> },
  ];

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
        <h2 style={{ margin: 0 }}>Procurement Officer</h2>
        <span style={{ fontSize: '24px', cursor: 'pointer' }}>🔔</span>
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
            <Breadcrumb style={{ margin: '16px 0' }}>
              {/* You can add breadcrumb items here if needed */}
            </Breadcrumb>
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