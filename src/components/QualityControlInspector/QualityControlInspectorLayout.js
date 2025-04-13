import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Modal, Typography } from 'antd';
import { FileSearchOutlined, CheckSquareOutlined, ExclamationCircleOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IncomingInventory from './IncomingInventory';
import InspectionResults from './InspectionResults';
import CorrectiveActions from './CorrectiveActions';
import QualityAssuranceChecks from './ChecklistPage';
import { selectUserDetails } from '../../redux/slices/authSlice';
import '../../styles/ProcurementOfficer/ProcurementOfficer.css';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const QualityControlInspectorLayout = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const userDetails = useSelector(selectUserDetails);
  const username = userDetails?.name || 'Guest';
  const email = userDetails?.email || 'No email available';

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const showProfile = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
      <Header
        className="Header"
        style={{
          position: 'fixed',
          width: '100%',
          backgroundColor: '#4CAF50',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
          minHeight: '80px'
        }}
      >
        <h2 style={{ margin: 0, fontSize: '20px' }}>BBZ Foods Manufacturing S.C Promasidor Ethiopia</h2>
      </Header>

      <Layout style={{ marginTop: 70 }}>
        <Sider style={{ position: 'fixed', left: 0, top: 64, bottom: 0, background: '#4CAF50' }} collapsible>
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
              onClick={() => setDropdownVisible(!dropdownVisible)}  // Make the avatar clickable
            />
            {dropdownVisible && (
              <Dropdown
                overlay={userMenu}
                trigger={['click']}
                visible={dropdownVisible}
                onVisibleChange={setDropdownVisible}
                placement="bottomCenter"
              >
                <div style={{ cursor: 'pointer' }} />
              </Dropdown>
            )}
            <hr style={{ border: '1px solid black', margin: '10px 0' }} />
            <Text strong style={{ color: '#F4F4F4', fontSize: '18px' }}>Quality Control Inspector</Text>
          </div>

          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<FileSearchOutlined />} style={{ marginBottom: '15px' }}>
              <Link to="incoming-inventory">Incoming Inventory</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<CheckSquareOutlined />} style={{ marginBottom: '15px' }}>
              <Link to="inspection-results">Inspection Results</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout style={{ marginLeft: 200 }}>
          <Content style={{ margin: '16px' }}>
            <Routes>
              <Route path="incoming-inventory" element={<IncomingInventory />} />
              <Route path="inspection-results" element={<InspectionResults />} />
              <Route path="corrective-actions" element={<CorrectiveActions />} />
              <Route path="quality-assurance-checks" element={<QualityAssuranceChecks />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default QualityControlInspectorLayout;
