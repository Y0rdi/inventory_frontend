import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Spin, Alert, Modal, Button } from 'antd';
import { fetchDepartmentRequests, selectRequests, selectLoading, selectError } from '../../redux/slices/purchaseRequestSlice';
import { format } from 'date-fns';

const RequestHistory = () => {
  const dispatch = useDispatch();
  const requests = useSelector(selectRequests);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    dispatch(fetchDepartmentRequests());
  }, [dispatch]);

  const showModal = (request) => {
    setSelectedRequest(request);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRequest(null);
  };

  const columns = [
    {
      title: 'Item',
      dataIndex: 'itemDetails',
      key: 'itemDetails',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Date',
      dataIndex: 'requestDate',
      key: 'requestDate',
      render: (date) => format(new Date(date), 'yyyy-MM-dd'),
    },
  ];

  if (loading) {
    return <Spin tip="Loading requests..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  // Custom styles
  const modalContentStyle = {
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  };

  const modalHeaderStyle = {
    backgroundColor: '#f1f1f1',
    borderBottom: '2px solid #ccc',
  };

  const modalTitleStyle = {
    fontSize: '18px',
    color: '#333',
    fontWeight: '600',
  };

  const modalTextStyle = {
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#555',
    marginBottom: '10px',
  };

  const closeButtonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  };

  const closeButtonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <div>
      <h2>Request History</h2>
      {requests.length === 0 ? (
        <p>No purchase requests found.</p>
      ) : (
        <Table
          columns={columns}
          dataSource={requests}
          onRow={(record) => ({
            onClick: () => showModal(record),
          })}
          rowKey="requestID"
        />
      )}

      {/* Modal to display request details */}
      <Modal
        title={`Request ID: ${selectedRequest?.requestID}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button
            key="close"
            onClick={handleCancel}
            style={closeButtonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = closeButtonHoverStyle.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = closeButtonStyle.backgroundColor}
          >
            Close
          </Button>,
        ]}
        style={modalContentStyle}
        headerStyle={modalHeaderStyle}
      >
        {selectedRequest && (
          <div>
            <p style={modalTextStyle}><strong>Item:</strong> {selectedRequest.itemDetails}</p>
            <p style={modalTextStyle}><strong>Quantity:</strong> {selectedRequest.quantity}</p>
            <p style={modalTextStyle}><strong>Delivery Requirements:</strong> {selectedRequest.deliveryRequirements}</p>
            <p style={modalTextStyle}><strong>Date:</strong> {format(new Date(selectedRequest.requestDate), 'yyyy-MM-dd')}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RequestHistory;
