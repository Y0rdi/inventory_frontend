import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRequestedItems,
  resetMessages,
  approveRequest,
  declineRequest,
} from "../../redux/slices/requestedItemsSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // import the styles for the datepicker

const RequestedItemsPage = () => {
  const dispatch = useDispatch();
  const { loading, requestedItems, errorMessage, successMessage } = useSelector(
    (state) => state.requestedItems
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [supplierIndex, setSupplierIndex] = useState(""); // Store supplier index
  const [note, setNote] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(null); // Store delivery date

  const suppliers = ["Abebe Melaku", "Selam Ayalew", "Werku Belay"]; // List of suppliers

  useEffect(() => {
    dispatch(getAllRequestedItems());
    return () => {
      dispatch(resetMessages());
    };
  }, [dispatch]);

  const openModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSupplierIndex("");
    setNote("");
    setDeliveryDate(null); // Reset delivery date
    setSelectedRequest(null);
  };

  const handleApproveSubmit = () => {
    if (supplierIndex && selectedRequest && deliveryDate) {
      const requestID = selectedRequest.requestID;
      const supplierID = parseInt(supplierIndex) + 3; // Use the index as the supplier ID
      const itemDetails = selectedRequest.itemDetails; // Get itemDetails from the selected request
      const quantity = selectedRequest.quantity; // Get quantity from the selected request
  
      console.log(`Approving request with ID: ${requestID}`);
      console.log(`Selected Supplier ID: ${supplierID}, Note: ${note}, Delivery Date: ${deliveryDate}`);
      console.log(`Item Details: ${itemDetails}, Quantity: ${quantity}`);
  
      // Dispatch approveRequest with the required data
      dispatch(approveRequest({ requestID, supplierID, note, deliveryDate, itemDetails, quantity }));
      closeModal();
    } else {
      alert("Please select a supplier, write a note, and choose a delivery date.");
    }
  };
  
  const handleDecline = (requestID) => {
    console.log(`Declining request with ID: ${requestID}`);
    dispatch(declineRequest(requestID));
  };

  const handleRefresh = () => {
    dispatch(getAllRequestedItems());
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>All Requested Items</h2>
      <button onClick={handleRefresh} style={styles.refreshButton}>
        Refresh
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {requestedItems.length === 0 ? (
        <p>No requested items found</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.headerCell}>Item Details</th>
              <th style={styles.headerCell}>Quantity</th>
              <th style={styles.headerCell}>Delivery Requirements</th>
              <th style={styles.headerCell}>Requested By</th>
              <th style={styles.headerCell}>Status</th>
              <th style={styles.headerCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requestedItems.map((request) => (
              <tr
                key={request.requestID}
                style={{
                  backgroundColor:
                    selectedRequest && selectedRequest.requestID === request.requestID
                      ? "#f0f8ff" // Highlight selected row
                      : "transparent",
                }}
              >
                <td style={styles.cell}>{request.itemDetails}</td>
                <td style={styles.cell}>{request.quantity}</td>
                <td style={styles.cell}>{request.deliveryRequirements}</td>
                <td style={styles.cell}>Beza</td> {/* Changed to "Beza" */}
                <td style={styles.cell}>{request.status}</td>
                <td style={styles.cell}>
                  <button
                    style={styles.approveButton}
                    onClick={() => openModal(request)} // Pass the request to the modal
                  >
                    Approve
                  </button>
                  <button
                    style={styles.declineButton}
                    onClick={() => handleDecline(request.requestID)}
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Approve Request</h3>
            <label style={styles.label}>
              Select Supplier:
              <select
                value={supplierIndex}
                onChange={(e) => setSupplierIndex(e.target.value)}
                style={styles.input}
              >
                <option value="">--Select Supplier--</option>
                {suppliers.map((supplier, index) => (
                  <option key={index} value={index + 1}>
                    {supplier}
                  </option>
                ))}
              </select>
            </label>
            <label style={styles.label}>
              Note:
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={{ ...styles.input, height: "100px" }}
              />
            </label>
            <label style={styles.label}>
              Delivery Date:
              <DatePicker
                selected={deliveryDate}
                onChange={(date) => setDeliveryDate(date)}
                dateFormat="MMMM d, yyyy"
                style={styles.input}
                placeholderText="Select a delivery date"
              />
            </label>
            <div style={styles.modalActions}>
              <button style={styles.approveButton} onClick={handleApproveSubmit}>
                Submit
              </button>
              <button style={styles.declineButton} onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
  headerCell: { border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2", textAlign: "left" },
  cell: { border: "1px solid #ddd", padding: "8px", textAlign: "left" },
  approveButton: { marginRight: "10px", padding: "5px 10px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer", borderRadius: "4px" },
  declineButton: { padding: "5px 10px", backgroundColor: "#f44336", color: "white", border: "none", cursor: "pointer", borderRadius: "4px" },
  refreshButton: { padding: "10px 15px", backgroundColor: "#007BFF", color: "white", border: "none", cursor: "pointer", borderRadius: "4px", marginBottom: "15px" },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" },
  modalContent: { backgroundColor: "white", padding: "20px", borderRadius: "8px", width: "400px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" },
  label: { display: "block", marginBottom: "10px", fontSize: "14px", fontWeight: "bold" },
  input: { width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ddd" },
  modalActions: { display: "flex", justifyContent: "flex-end", gap: "10px" },
};

export default RequestedItemsPage;
