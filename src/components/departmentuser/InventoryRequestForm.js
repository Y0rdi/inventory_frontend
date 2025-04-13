import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendInventoryRequest, resetMessages } from "../../redux/slices/inventoryRequestSlice";
import { Typography, Select, Button, Input, Form } from "antd";

const { Text } = Typography;
const { Option } = Select;

const InventoryRequestForm = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    requestedQuantity: "",
  });

  const dispatch = useDispatch();

  const { loading, successMessage, errorMessage } = useSelector(
    (state) => state.inventoryRequest
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
      itemName: value,
    });
  };

  const handleSubmit = (values) => {
    dispatch(sendInventoryRequest(values));
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
          Inventory Request Form
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
            label="Item Name"
            name="itemName"
            rules={[{ required: true, message: "Please select an item!" }]}
          >
            <Select
              value={formData.itemName}
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
              <Option value="film">Film</Option>
              <Option value="plastic">Plastic</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Requested Quantity"
            name="requestedQuantity"
            rules={[
              { required: true, message: "Please enter the requested quantity!" },
              { pattern: /^[0-9]*$/, message: "Quantity must be a valid number" },
            ]}
          >
            <Input
              type="number"
              name="requestedQuantity"
              value={formData.requestedQuantity}
              onChange={handleChange}
              placeholder="Enter Requested Quantity"
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

export default InventoryRequestForm;
