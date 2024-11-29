// src/components/InventoryManager/InventoryManagerLayout.js
import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Route, Routes } from 'react-router-dom';
import { BarChartOutlined, SwapOutlined, ReconciliationOutlined } from '@ant-design/icons';
import InventoryDashboard from './InventoryDashboard';
import InventoryMovements from './InventoryMovements';
import InventoryAudit from './InventoryAudit';
import '../../styles/ProcurementOfficer/ProcurementOfficer.css'; // Your custom styles

const { Header, Sider, Content } = Layout;

const InventoryManagerLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header className="Header" style={{ position: 'fixed', width: '100%', zIndex: 1, backgroundColor: '#4CAF50', color: 'white' }}>
        <h2>Inventory Manager</h2>
        <span style={{ position: 'fixed', right: '10px', top: '0', padding: '10px', fontSize: '24px' }}>🔔</span>
      </Header>

      {/* Sidebar */}
      <Sider collapsible style={{ background: '#4CAF50' }}>
        <Menu style={{ paddingTop: '100px', gap: '10px' }} theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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

      <Layout>
        {/* Header inside content layout */}
        <Header style={{ background: '#4CAF50', color: 'white', textAlign: 'left', marginBottom: '10px' }}>
          Inventory Manager Dashboard
        </Header>

        {/* Content area where child components will be rendered */}
        <Content style={{ margin: '16px' }}>
          <Routes>
            <Route path="inventory-dashboard" element={<InventoryDashboard />} />
            <Route path="inventory-movements" element={<InventoryMovements />} />
            <Route path="inventory-audit" element={<InventoryAudit />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default InventoryManagerLayout;
