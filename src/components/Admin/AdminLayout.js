// src/components/admin/AdminLayout.js
import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../../styles/ProcurementOfficer/Header.css';
import '../../styles/ProcurementOfficer/ProcurementOfficer.css';

const { Header, Content, Footer, Sider } = Layout;

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const colorBgContainer = "#4CAF50";

  const menuItems = [
    { key: '1', label: <Link to="/admin/dashboard">Dashboard</Link>, icon: <DashboardOutlined /> },
    { key: '2', label: <Link to="/admin/user-management">User Management</Link>, icon: <UserOutlined /> },
    { key: '3', label: <Link to="/admin/inventory-settings">Inventory Settings</Link>, icon: <SettingOutlined /> },
  ];
  

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className='Header' style={{ position: 'fixed', width: '100%', zIndex: 1, backgroundColor: colorBgContainer, color: 'white' }}>
        <h2>Admin Panel</h2>
        <span style={{ position: 'fixed', right: '10px', top: '0', padding: '10px', fontSize: '24px' }}>🔔</span>
      </Header>
      
      <Layout style={{ marginTop: 64 }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ background: colorBgContainer, color: 'black' }}
        //   className='ant-layout-sider-children'
        >
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
        </Sider>
        
        <Layout>
          <Content style={{ margin: '16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
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

export default AdminLayout;
