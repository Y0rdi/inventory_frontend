// reducers/orderReducer.js

import { useDispatch } from 'react-redux';

// Action types
const MARK_ORDER_AS_DELIVERED_REQUEST = 'MARK_ORDER_AS_DELIVERED_REQUEST';
const MARK_ORDER_AS_DELIVERED_SUCCESS = 'MARK_ORDER_AS_DELIVERED_SUCCESS';
const MARK_ORDER_AS_DELIVERED_FAILURE = 'MARK_ORDER_AS_DELIVERED_FAILURE';

// Initial state
const initialState = {
  loading: false,
  order: null,
  error: null,
};

// Reducer function
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case MARK_ORDER_AS_DELIVERED_REQUEST:
      return { ...state, loading: true, error: null };
    case MARK_ORDER_AS_DELIVERED_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case MARK_ORDER_AS_DELIVERED_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Action creators
const markOrderAsDelivered = (orderID) => async (dispatch, getState) => {
  try {
    dispatch({ type: MARK_ORDER_AS_DELIVERED_REQUEST });

    const { user } = getState();
    const { supplierID } = user;

    if (!supplierID) {
      throw new Error('Supplier ID is required');
    }

    const response = await fetch("http://localhost:3000/api/deliver", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderID }),
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: MARK_ORDER_AS_DELIVERED_SUCCESS, payload: data.order });
    } else {
      throw new Error(data.message || 'Failed to mark order as delivered');
    }
  } catch (error) {
    dispatch({ type: MARK_ORDER_AS_DELIVERED_FAILURE, payload: error.message });
  }
};

export { orderReducer, markOrderAsDelivered };
