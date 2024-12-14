import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequestedItems, approveRequest, declineRequest } from '../../redux/slices/requestedItemsSlice'; // Import the thunks
import { Card, Spin, List, Button, message } from 'antd'; // Add Button and message for success/error alerts

const RequestedItemsList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.requestedItems);

  useEffect(() => {
    dispatch(fetchRequestedItems()); // Dispatch the action to fetch requested items
  }, [dispatch]);

  const handleApprove = (itemId) => {
    dispatch(approveRequest(itemId))
      .then(() => {
        message.success('Request approved successfully!');
      })
      .catch((err) => {
        message.error(`Error: ${err.message}`);
      });
  };

  const handleDecline = (itemId) => {
    dispatch(declineRequest(itemId))
      .then(() => {
        message.success('Request declined successfully!');
      })
      .catch((err) => {
        message.error(`Error: ${err.message}`);
      });
  };

  if (loading) {
    return <Spin tip="Loading items..." />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Requested Items</h2>
      <List
        dataSource={items}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card title={`Item: ${item.name}`}>
              <p>Quantity: {item.quantity}</p>
              <p>Requested By: {item.requestedBy}</p>
              <p>Date: {item.date}</p>
              <div>
                <Button 
                  type="primary" 
                  onClick={() => handleApprove(item.id)} 
                  style={{ marginRight: '10px' }}
                >
                  Accept
                </Button>
                <Button 
                  type="danger" 
                  onClick={() => handleDecline(item.id)}
                >
                  Decline
                </Button>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default RequestedItemsList;
