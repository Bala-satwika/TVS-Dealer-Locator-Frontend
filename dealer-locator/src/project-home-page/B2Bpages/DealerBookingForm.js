import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import './DealerBookingForm.css';
import Navbar from './Navbar';

const vehicles = [
  { name: 'TVS Apache RR 310' },
  { name: 'TVS Apache RTR 200 4V' },
  { name: 'TVS Sport' },
  { name: 'TVS Scooty Zest 110' },
  { name: 'TVS iQube S' },
  { name: 'TVS Apache' },
  { name: 'TVS XL100 Heavy Duty' },
  { name: 'TVS Apache RTR 180' },
  { name: 'TVS NTorq 125' },
  { name: 'TVS Raider 125' },
  { name: 'TVS Radeon' },
  { name: 'TVS Jupiter' },
  { name: 'TVS iQube' },
  { name: 'TVS iQube Electric' },
  { name: 'TVS Star City Plus' },
  { name: 'TVS Victor' },
  { name: 'TVS Scooty Pep Plus' },
  { name: 'TVS XL100 Comfort' },
  { name: 'TVS Apache RTR 160' },
  { name: 'TVS Jupiter ZX' },
  { name: 'TVS Apache RTR 160 4V' },
  { name: 'TVS Jupiter Classic' },
  { name: 'TVS Raider' },
  { name: 'TVS iQube ST' },
  { name: 'TVS XL100 i-Touch Start' }
];

const DealerBookingForm = () => {
  const [vehicle, setVehicle] = useState(localStorage.getItem('selectedVehicle') || '');
  const [state, setState] = useState(localStorage.getItem('selectedState') || '');
  const [dealers, setDealers] = useState(JSON.parse(localStorage.getItem('dealersList')) || []);
  const [topDealers, setTopDealers] = useState(JSON.parse(localStorage.getItem('topDealersList')) || []);
  const [states, setStates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8010/api/dealers/states')
      .then(response => setStates(response.data))
      .catch(error => console.error('Error fetching states:', error));
  }, []);

  const handleFilterChange = useCallback(async () => {
    if (vehicle) {
      try {
        const response = await axios.get('http://localhost:8010/api/dealers/filter', {
          params: { vehicle, state }
        });
        const sortedDealers = response.data.sort((a, b) => {
          const stockA = a.vehicles.find(v => v.name === vehicle)?.stock || 0;
          const stockB = b.vehicles.find(v => v.name === vehicle)?.stock || 0;
          return stockB - stockA;
        });
        setDealers(response.data);
        setTopDealers(sortedDealers.slice(0, 5));

        // Store state in localStorage
        localStorage.setItem('selectedVehicle', vehicle);
        localStorage.setItem('selectedState', state);
        localStorage.setItem('dealersList', JSON.stringify(response.data));
        localStorage.setItem('topDealersList', JSON.stringify(sortedDealers.slice(0, 5)));
      } catch (error) {
        console.error('Error fetching dealers:', error);
      }
    }
  }, [vehicle, state]);

  useEffect(() => {
    handleFilterChange();
  }, [handleFilterChange]);

  const barChartData = topDealers.map(dealer => {
    const vehicleInfo = dealer.vehicles.find(v => v.name === vehicle);
    return {
      name: dealer.name,
      stock: vehicleInfo ? vehicleInfo.stock : 0,
    };
  });

  const pieChartData = barChartData.map(dealer => ({
    name: dealer.name,
    value: dealer.stock,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4563'];

  return (
    <>
      <Navbar />
      <div id="page-container-dealer-booking">
        <div id="content-container-dealer-booking">
          <div id="dealer-list-container-dealer-booking">
            <h2 id="header-dealer-booking">Find Dealers</h2>
            <form>
              <div id="form-group-dealer-booking" className="form-group">
                <label id="label-dealer-booking">Select Vehicle*</label>
                <select
                  id="form-control-dealer-booking"
                  className="form-control"
                  value={vehicle}
                  onChange={e => setVehicle(e.target.value)}
                  required
                >
                  <option value="">Choose a vehicle</option>
                  {vehicles.map((vehicle, index) => (
                    <option key={index} value={vehicle.name}>
                      {vehicle.name}
                    </option>
                  ))}
                </select>
              </div>
              <div id="form-group-dealer-booking" className="form-group">
                <label id="label-dealer-booking">Select State (optional)</label>
                <select
                  id="form-control-dealer-booking"
                  className="form-control"
                  value={state}
                  onChange={e => setState(e.target.value)}
                >
                  <option value="">All States</option>
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            <div id="dealer-card-container" className="dealer-cards-wrapper">
  {dealers.length > 0 ? (
    dealers.map(dealer => {
      const vehicleInfo = dealer.vehicles.find(v => v.name === vehicle);
      const stock = vehicleInfo ? vehicleInfo.stock : 0;
      return (
        <div key={dealer.id} className="dealer-card-box">
          <div className="dealer-card-content">
            <h3 className="dealer-card-title">{dealer.name}</h3>
            <p className="dealer-card-address"><strong>Address:</strong> {dealer.address}</p>
            <p className="dealer-card-state"><strong>State:</strong> {dealer.state}</p>
            <p className="dealer-card-phone"><strong>Phone:</strong> {dealer.phoneNumber}</p>
            <div className="dealer-card-stock">
              <i className="fa fa-archive dealer-card-stock-icon"></i>
              <span className="dealer-card-stock-number">Stock: {stock}</span>
            </div>
            <button className="dealer-card-view-orders-btn" onClick={() => navigate(`/orderlist/${dealer.dealerId}`)}>
              View Orders
            </button>
          </div>
        </div>
      );
    })
  ) : (
    <p>No dealers found.</p>
  )}
</div>

          </div>
          <div id="charts-container-dealer-booking">
  <div id="chart-bar-dealer-booking" className="chart-box">
    <h3>Top 5 Dealers - Stock Bar Chart</h3>
    <BarChart width={500} height={300} data={barChartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="stock" fill="#8884D8" />
    </BarChart>
  </div>
  
  <div  className="chart-box">
    <h3>Top 5 Dealers - Stock Pie Chart</h3>
    <PieChart width={400} height={400}>
      <Pie
        data={pieChartData}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884D8"
        paddingAngle={5}
        dataKey="value"
      >
        {pieChartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </div>
</div>


        </div>
      </div>
    </>
  );
};

export default DealerBookingForm;
