// src/components/warehouse/WarehouseLayout.js
import React from 'react';
import { Layout, Menu } from 'antd';
import { DatabaseOutlined, FileSyncOutlined } from '@ant-design/icons';
import LogIncomingItems from './LogIncomingItems';
import InternalTransfers from './InternalTransfers';
import { Link, Route, Routes } from 'react-router-dom';
import '../../styles/ProcurementOfficer/ProcurementOfficer.css';

const { Header, Sider, Content } = Layout;

const WarehouseLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className='Header' style={{ position: 'fixed', width: '100%', zIndex: 1, backgroundColor: '#4CAF50', color: 'white' }}>
        <h2>Warehouse Staff</h2>
        <span style={{ position: 'fixed', right: '10px', top: '0', padding: '10px', fontSize: '24px' }}>🔔</span>
      </Header>

      <Layout>
        <Sider collapsible>
          <Menu theme="dark" defaultSelectedKeys={['log-incoming-items']} mode="inline" style={{ paddingTop: '100px', gap: '10px' }}>
            <Menu.Item key="log-incoming-items" icon={<DatabaseOutlined />}>
              <Link to="log-incoming-items">Log Incoming Items</Link>
            </Menu.Item>
            <Menu.Item key="internal-transfers" icon={<FileSyncOutlined />}>
              <Link to="internal-transfers">Internal Transfers</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Content style={{ margin: '16px' }}>
            <Routes>
              <Route path="log-incoming-items" element={<LogIncomingItems />} />
              <Route path="internal-transfers" element={<InternalTransfers />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default WarehouseLayout;
