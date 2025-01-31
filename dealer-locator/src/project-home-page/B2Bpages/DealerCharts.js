import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];
const DealerCharts = ({ data }) => {
  const top5Dealers = data.sort((a, b) => b.stock - a.stock).slice(0, 5);
  const pieData = top5Dealers.map(dealer => ({
    name: dealer.name,
    value: dealer.stock,
  }));
  return (
    <div className="charts-container">
      <h3>Top 5 Dealerships by Stock</h3>
      <div className="chart">
        <PieChart width={400} height={400}>
          <Pie
            data={pieData}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={150}
            fill="#8884D8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div className="chart">
        <BarChart
          width={500}
          height={300}
          data={top5Dealers}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="stock" fill="#8884D8" />
        </BarChart>
      </div>
    </div>
  );
};
export default DealerCharts;