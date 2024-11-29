// src/components/InventoryManager/InventoryDashboard.js
import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { LineChartOutlined, StockOutlined, BranchesOutlined } from '@ant-design/icons';


const InventoryDashboard = () => {
  return (
    <div>
      <h2>Inventory Dashboard</h2>
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Total Items"
              value={112893}
              prefix={<StockOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Items Received"
              value={12000}
              prefix={<LineChartOutlined />}
              valueStyle={{ color: '#2f54eb' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Items in Transit"
              value={5000}
              prefix={<BranchesOutlined />}
              valueStyle={{ color: '#fa541c' }}
            />
          </Card>
        </Col>
      </Row>

    
    </div>
  );
};

export default InventoryDashboard;
