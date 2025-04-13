// src/components/MessageCommunication.js
import React, { useState } from 'react';
import { Tabs, Form, Input, Button, Typography, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import '../../styles/SupplierCommunication.css';

const { TabPane } = Tabs;
const { Title } = Typography;

const MessageCommunication = () => {
  const [activeTab, setActiveTab] = useState('leaveMessage');
  const [form] = Form.useForm();

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleSendMessage = (values) => {
    message.success('Message sent successfully!');
    form.resetFields(); // Reset form after sending
  };

  return (
    <div className="message-communication">
      <Title level={2} style={{ color: '#4caf50' }}>Messages</Title>
      
      <Tabs activeKey={activeTab} onChange={handleTabChange} centered>
        <TabPane tab="Leave Message" key="leaveMessage">
          <div className="form-container">
            <Form
              form={form}
              onFinish={handleSendMessage}
              layout="vertical"
              className="message-form"
            >
              <Form.Item label="Message" name="message" rules={[{ required: true, message: 'Please enter your message!' }]}>
                <Input.TextArea rows={4} placeholder="Write your message here..." />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SendOutlined />} style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }}>
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </div>
        </TabPane>

        <TabPane tab="Received Messages" key="receivedMessages">
          <div className="received-messages">
            <p>No received messages yet.</p>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MessageCommunication;
