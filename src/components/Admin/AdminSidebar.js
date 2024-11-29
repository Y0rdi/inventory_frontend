// src/components/Admin/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2> {/* Add sidebar-title class */}
      <ul>
        <li>
          <NavLink to="/admin/dashboard" activeClassName="active">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" activeClassName="active">
            User Management
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/inventory-settings" activeClassName="active">
            Inventory Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
