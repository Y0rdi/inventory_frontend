import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/slices/userSlice';  // Import the userSlice
import authReducer from '../redux/slices/authSlice';  // Import the authSlice
import supplierReducer from '../redux/slices/supplierSlice';  // Import the supplierSlice
import updatePasswordReducer from "./slices/updatePasswordSlice";
import pendingRequestsReducer from "./slices/pendingRequestsSlice";
import inventoryReducer from './slices/inventorySlice';
import purchaseRequestReducer from "./slices/purchaseRequestSlice";
import requestedItemsReducer from "./slices/requestedItemsSlice"; // Updated slice import
import inventoryRequestReducer from "./slices/inventoryRequestSlice";
import ordersReducer from './slices/ordersSlice';
import incomingInventoryReducer from './slices/incomingInventorySlice';
import inspectionOrdersReducer from './slices/inspectionOrdersSlice';
import inventoryRequestsReducer from './slices/approveinventoryrequest';
import confirmedReducer from './slices/confirmedslice';  
import confirmedByPoReducer from './slices/confirmedByPoSlice'; 
import internalWarehouseReducer from './slices/internalWarehouseSlice';
import inventoryreportReducer from "./slices/inventoryreports"; // Import the inventory slice


const store = configureStore({
  reducer: {
    user: userReducer, // Handles user data
    auth: authReducer, // Handles authentication state
    supplier: supplierReducer, // Handles supplier communication state
    requestedItems: requestedItemsReducer,
    updatePassword: updatePasswordReducer,
    pendingRequests: pendingRequestsReducer,
    inventory: inventoryReducer,
    purchaseRequest: purchaseRequestReducer,
    inventoryRequest: inventoryRequestReducer,
    orders: ordersReducer,
    incomingInventory: incomingInventoryReducer,
    inspectionOrders: inspectionOrdersReducer,
    inventoryRequests: inventoryRequestsReducer,
    confirmed: confirmedReducer,  
    confirmedByPo: confirmedByPoReducer,  // 
    internalWarehouse: internalWarehouseReducer,
    inventoryreport: inventoryreportReducer, // Add the inventory reducer to the store
  },
});

export default store;
