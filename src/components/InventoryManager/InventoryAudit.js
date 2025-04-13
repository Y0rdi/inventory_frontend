import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventoryStatusDistribution, fetchInventoryUsageReport } from "../../redux/slices/inventoryreports";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { Card } from 'antd';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const InventoryReport = () => {
  const dispatch = useDispatch();
  const { statusDistribution, usageReport } = useSelector((state) => state.inventoryreport);

  useEffect(() => {
    dispatch(fetchInventoryStatusDistribution());
    dispatch(fetchInventoryUsageReport());
  }, [dispatch]);
  console.log("Status Distribution Data:", statusDistribution); 

  const pieData = statusDistribution.labels.map((label, index) => ({
    name: label,
    value: statusDistribution.data[index],
  }));

  const barData = usageReport.labels.map((label, index) => ({
    name: label,
    usage: usageReport.data[index],
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {/* Status Distribution Pie Chart */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Inventory Status Distribution</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </Card>

      {/* Inventory Usage Bar Chart */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Inventory Usage Report</h2>
        <BarChart width={500} height={300} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="usage" fill="#4CAF50" />
        </BarChart>
      </Card>
    </div>
  );
};

export default InventoryReport;
