import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPurchaseRequest, resetMessages } from "../../redux/slices/purchaseRequestSlice";
import { Typography, Select, Button, Input, Form, message } from "antd";

const { Text } = Typography;
const { Option } = Select;

const PurchaseRequestForm = () => {
  const [formData, setFormData] = useState({
    itemDetails: "",
    quantity: "",
    deliveryRequirements: "",
  });

  const dispatch = useDispatch();

  const { loading, successMessage, errorMessage } = useSelector(
    (state) => state.purchaseRequest
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      itemDetails: value,
    });
  };

  const handleSubmit = (values) => {
    dispatch(createPurchaseRequest(values));
  };

  const handleReset = () => {
    dispatch(resetMessages());
  };

  return (
    <div
      style={{
        marginTop: "10px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: "60%",
          background: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "800px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}>
         Purchase Request Form
        </h2>
        {successMessage && (
          <p style={{ color: "green", textAlign: "center" }}>
            {successMessage} <Button onClick={handleReset}>Clear</Button>
          </p>
        )}
        {errorMessage && (
          <p style={{ color: "red", textAlign: "center" }}>
            {errorMessage} <Button onClick={handleReset}>Clear</Button>
          </p>
        )}

        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={formData}
        >
          <Form.Item
            label="Item Details"
            name="itemDetails"
            rules={[
              {
                required: true,
                message: "Please select an item!",
              },
            ]}
          >
            <Select
              value={formData.itemDetails}
              onChange={handleSelectChange}
              placeholder="Select Item"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              <Option value="soya">Soya</Option>
              <Option value="cardbox">Cardbox</Option>
              <Option value="plastic">Plastic</Option>
              <Option value="film">Film</Option>
              <Option value="seasoning">Seasoning</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Please enter the quantity!",
              },
              {
                pattern: /^[0-9]*$/,
                message: "Quantity must be a valid number",
              },
            ]}
          >
            <Input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter Quantity"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Delivery Requirements"
            name="deliveryRequirements"
            rules={[
              {
                required: true,
                message: "Please enter the delivery requirements!",
              },
            ]}
          >
            <Input
              type="text"
              name="deliveryRequirements"
              value={formData.deliveryRequirements}
              onChange={handleChange}
              placeholder="Enter Delivery Requirements"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default PurchaseRequestForm;
