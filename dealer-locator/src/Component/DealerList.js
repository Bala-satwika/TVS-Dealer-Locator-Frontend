import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DealerCard from './DealerCard';
import './DealerList.css';
import API_BASE_URLS from '../config';
import DirectionsIcon from '@mui/icons-material/Directions';
import { DataGrid } from '@mui/x-data-grid';

const DealerList = ({ lat, lng, radius, selectedFilters, showSwitchToTableView, parentViewMode }) => {
  const [dealers, setDealers] = useState([]);
  const [displayMode, setDisplayMode] = useState('card');

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} style={{ color: 'gold' }}>★</span>);
    }
    if (halfStar) {
      stars.push(<span key={fullStars} style={{ color: 'gold' }}>☆</span>);
    }
    return stars;
  };

  useEffect(() => {
    if (parentViewMode === 'both') {
      setDisplayMode('card');
    }
  }, [parentViewMode]);

  useEffect(() => {
    const fetchDealers = async () => {
      if (lat && lng) {
        try {
          const params = new URLSearchParams();
          params.append('lat', lat);
          params.append('lng', lng);
          params.append('radiusInKm', radius);
  
          // Get selected filter types and append each 'type' separately
          const selectedTypes = Object.keys(selectedFilters).filter(key => selectedFilters[key]);
          selectedTypes.forEach(type => params.append('type', type));
  
          console.log("API params: ", params.toString()); // Debug log for API params
  
          const response = await axios.get(`${API_BASE_URLS.DEALERS.PROXIMITY}?${params.toString()}`);
          setDealers(response.data);
  
          console.log("Dealers data: ", response.data); // Debug log for response data
        } catch (error) {
          console.error('Error fetching nearby dealers:', error);
        }
      }
    };
  
    fetchDealers();
  }, [lat, lng, radius, selectedFilters]);
  
  

  const toggleView = () => {
    if (parentViewMode === 'both') {
      setDisplayMode('card');
    } else {
      setDisplayMode(displayMode === 'card' ? 'table' : 'card');
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 2, minWidth: 150 },
    { field: 'distanceInKm', headerName: 'Distance (km)', flex: 1, minWidth: 120 },
    { field: 'address', headerName: 'Location', flex: 2, minWidth: 200 },
    { field: 'timings', headerName: 'Timings', flex: 1, minWidth: 150 },
    { field: 'phoneNumber', headerName: 'Contact', flex: 1, minWidth: 150 },
    {
      field: 'ratings',
      headerName: 'Ratings',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => renderStars(params.value),
    },
    {
      field: 'directions',
      headerName: 'Directions',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(params.row.name)}+${encodeURIComponent(params.row.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="get-directions-link-unique"
        >
          Directions <DirectionsIcon />
        </a>
      ),
    },
  ];

  const rows = dealers.map((dealer) => ({
    id: dealer.id,
    name: dealer.name,
    distanceInKm: `${dealer.distanceInKm} Km`,
    address: dealer.address,
    timings: dealer.timings,
    phoneNumber: dealer.phoneNumber,
    ratings: dealer.ratings,
  }));

  return (
    <>
      <div className="dealer-count-container">
        {dealers.length > 0 ? (
          <h5 className="dealer-count">
            Showing <b>{dealers.length}</b> results near your location
          </h5>
        ) : (
          ''
        )}

        {dealers.length > 0 && showSwitchToTableView && (
          <button className="view-toggle-button" onClick={toggleView}>
            {displayMode === 'card' ? 'Switch to Table View' : 'Switch to Card View'}
          </button>
        )}
      </div>

      <div className="dealer-list" style={{ height: 400, width: '100%' }}>
        {dealers.length > 0 ? (
          displayMode === 'card' ? (
            dealers.map((dealer) => <DealerCard key={dealer.id} dealer={dealer} />)
          ) : (
             <DataGrid
    rows={rows}
    columns={columns}
    pageSize={5}
    rowsPerPageOptions={[5, 10, 25]}
    pagination
    getRowId={(row) => row.id}
    style={{ overflowY: 'auto' }} // This ensures vertical scrolling works
  />  
          )
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </>
  );
};

export default DealerList;
