import React, { useState } from 'react';
import { Typography, Box, Alert } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import './OrdersChart.css'; // Create or update your CSS file
import { styled } from '@mui/material/styles';


const CustomInputLabel = styled(InputLabel)({
  fontSize: '1.4rem',
  color: '#0288d1',
});
// Define colors for better visualization
const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
  
const OrdersChart = ({ orders }) => {
  const [selectedChart, setSelectedChart] = useState('Bar Chart'); // Dropdown state
  



  if ( !orders || orders.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%" p={2}>
        <Alert severity="info" sx={{ backgroundColor: '#e0f7fa', color: '#0288d1' }}>
          <Typography variant="h6" align="center">
            No orders data available for visualization.
          </Typography>
        </Alert>
      </Box>
    );
  }
  // Handle dropdown selection change
  // Handle dropdown selection change
  const handleChartChange = (event) => {
    setSelectedChart(event.target.value);
  };



  // Data processing for Quantity vs. Product Name
  const productData = orders.flatMap(order =>
    order.items.map(item => ({
      product: item.product,
      quantity: item.quantity,
    }))
  );

  // Data for OrderId vs Total Items
  const orderData = orders.map(order => ({
    orderId: order.orderId,
    totalItems: order.items ? order.items.reduce((sum, item) => sum + item.quantity, 0) : 0,
  }));



  return (
    <div style={{ width: '100%', height: 'auto', marginTop: '20px' }}>
      <div id="header-container">
        <h2 id="h2">Orders Visualization</h2>
        <FormControl variant="outlined" id="chart-select">
        <InputLabel id="chart-select-label" ></InputLabel>
          <Select
            labelId="chart-select-label"
            value={selectedChart}
            onChange={handleChartChange}
            id="chart-select"
          >
            <MenuItem value="Bar Chart">Bar Chart</MenuItem>
            <MenuItem value="Line Chart">Line Chart</MenuItem>
            <MenuItem value="Pie Chart">Pie Chart</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Conditionally Render Charts based on Dropdown */}
      {selectedChart === 'Bar Chart' && (
        <div style={{ marginBottom: '40px' }}>
          <h3 id="h3">Bar Chart: Quantity vs Product</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={productData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#36A2EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {selectedChart === 'Line Chart' && (
        <div style={{ marginBottom: '40px' }}>
          <h3 id="h3">Line Chart: OrderId vs Total Items</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={orderData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="orderId" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalItems" stroke="#FF6384" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {selectedChart === 'Pie Chart' && (
        <div style={{ marginBottom: '40px' }}>
          <h3 id="h3">Pie Chart: Quantity Distribution by Product</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie data={productData} dataKey="quantity" nameKey="product" cx="50%" cy="50%" outerRadius={150} fill="#4BC0C0" label>
                {productData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default OrdersChart;