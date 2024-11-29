import React, { useState } from 'react';
import { Button, Modal, Form, Input, DatePicker, Table, Select, message } from 'antd';
import '../../styles/ProcurementOfficer/ProcurementOfficer.css';

const { Option } = Select;

const LogIncomingItems = () => {
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        const newItem = {
          key: items.length + 1,
          itemName: values.itemName,
          date: values.date.format('YYYY-MM-DD'),
          quantity: values.quantity,
          loggedBy: values.loggedBy,
          status: 'Pending',
        };
        setItems([...items, newItem]);
        form.resetFields();
        setVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleStatusChange = (item, status) => {
    const updatedItems = items.map((i) =>
      i.key === item.key ? { ...i, status } : i
    );
    setItems(updatedItems);
    message.success(`Item marked as ${status}`);
  };

  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'itemName',
      key: 'itemName',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Logged By',
      dataIndex: 'loggedBy',
      key: 'loggedBy',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span style={{ color: status === 'Processed' ? 'green' : status === 'Approved' ? 'blue' : 'red' }}>
          {status}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div>
          {record.status === 'Pending' && (
            <>
              <Button
                type="primary"
                onClick={() => handleStatusChange(record, 'Logged')}
                style={{ marginRight: '8px' }}
              >
                Logged
              </Button>
              <Button
                type="danger"
                onClick={() => handleStatusChange(record, 'Rejected')}
              >
                Rejected
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="log-incoming-items-container">
      <Button
        className="log-incoming-button"
        type="primary"
        onClick={showModal}
      >
        Log Incoming Item
      </Button>

      <Modal
        title="Log Incoming Item"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="itemName"
            label="Item Name"
            rules={[{ required: true, message: 'Please select the item name!' }]}
          >
            <Select placeholder="Select item">
              <Option value="Soya Bean">Soya Bean</Option>
              <Option value="Film">Film</Option>
              <Option value="Seasoning">Seasoning</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select the date!' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: 'Please input the quantity!' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="loggedBy"
            label="Logged By"
            rules={[{ required: true, message: 'Please input the name of the person logging the item!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Table
        className="log-incoming-table"
        columns={columns}
        dataSource={items}
        pagination={false}
      />
    </div>
  );
};

export default LogIncomingItems;
