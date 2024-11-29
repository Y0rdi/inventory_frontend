// src/components/Admin/AdminDashboard.js
import React from 'react';
import { Layout, Typography, Card, Row, Col } from 'antd';
import AdminSidebar from './AdminSidebar';
import '../../styles/Admin.css';

const { Content } = Layout;
const { Title } = Typography;

const AdminDashboard = () => {
  return (
    <Layout className="admin-container">
      
        <Content style={{ padding: '24px', minHeight: '100vh' }}>
          <Title level={1} style={{ color: '#4caf50' }}>Admin Dashboard</Title>
          <Row gutter={16} className="stats-container">
            <Col span={8}>
              <Card bordered={false} className="stat-box" hoverable>
                <Title level={2}>Total Users</Title>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>120</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false} className="stat-box" hoverable>
                <Title level={2}>Active Inventory Items</Title>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>50</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false} className="stat-box" hoverable>
                <Title level={2}>Pending Requests</Title>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>5</p>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
   
  );
};

export default AdminDashboard;
