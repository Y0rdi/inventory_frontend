import React, { useState, useEffect } from 'react';
import { Layout, Typography, Card, Row, Col, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import AdminSidebar from './AdminSidebar'; // Assuming the sidebar component is in place
import '../../styles/Admin.css';
import { fetchTotalUsers } from '../../redux/slices/userSlice'; // Import the fetchTotalUsers action
import axios from 'axios'; // Import axios for suppliers API calls

const { Content } = Layout;
const { Title } = Typography;

const AdminDashboard = () => {
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  // Redux dispatch and state
  const dispatch = useDispatch();
  const { totalUsers = [], loading: usersLoading, error } = useSelector((state) => state.users || {}); // Safe state access

  // Function to fetch suppliers data
  const fetchSuppliersData = async () => {
    try {
      const responseSuppliers = await axios.get('/api/suppliers'); // API endpoint for suppliers
      const suppliers = responseSuppliers.data;
      setTotalSuppliers(suppliers.length); // Set total suppliers
      setLoading(false); // Stop loading
    } catch (error) {
      console.error("Error fetching suppliers data:", error);
      setLoading(false); // Stop loading even on error
    }
  };

  // Fetch the data when the component mounts
  useEffect(() => {
    dispatch(fetchTotalUsers()); // Dispatch the action to fetch total users
    fetchSuppliersData(); // Fetch suppliers data
  }, [dispatch]);

  // Calculate active users if users data is available
  useEffect(() => {
    if (totalUsers.length > 0) {
      const activeUsersCount = totalUsers.filter(user => user.status === 'active').length;
      setActiveUsers(activeUsersCount);  // Total number of active users
    }
  }, [totalUsers]);

  // Display loading spinner while data is loading
  if (loading || usersLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout className="admin-container">
      <Content style={{ padding: '24px', minHeight: '100vh' }}>
        <Title level={1} style={{ color: '#4caf50' }}>Admin Dashboard</Title>
        <Row gutter={16} className="stats-container">
          <Col span={8}>
            <Card bordered={false} className="stat-box" hoverable>
              <Title level={2}>Total Users</Title>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalUsers.length}</p> {/* Display the length of totalUsers array */}
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false} className="stat-box" hoverable>
              <Title level={2}>Active Users</Title>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{activeUsers}</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false} className="stat-box" hoverable>
              <Title level={2}>Total Suppliers</Title>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalSuppliers}</p>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AdminDashboard;
