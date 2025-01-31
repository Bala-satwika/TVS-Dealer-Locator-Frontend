import React, { useState, useEffect } from 'react';
import Navbar from '../Component/Header';
import Map from '../Component/Map';
import Sidebar from '../Component/Sidebar';
import GoogleMapsLoader from '../Component/GoogleMapsLoader'; // Import the GoogleMapsLoader
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faList } from '@fortawesome/free-solid-svg-icons'; // Import icons
import './B2CHomepage.css'; // Custom styles

function B2CHomepage() {
  const [selectedCity, setSelectedCity] = useState(null); // Handle selected city
  const [filter, setFilter] = useState('all'); // Filter for All, Experience, Service, Charging
  const [selectedLocation, setSelectedLocation] = useState(null); // Selected location coordinates
  const [radius, setRadius] = useState(15); // Default radius (set to 15 km)
  const [dealers, setDealers] = useState([]);
  const [viewMode, setViewMode] = useState('both'); // 'both' for sidebar and map, 'sidebar' for only sidebar

  const resetMap = () => {
    setSelectedCity(null); // Reset city state or handle map zoom
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
    resetMap(); // Call resetMap when filter changes
  };

  useEffect(() => {
    if (selectedCity) {
      console.log('City selected:', selectedCity);
    }
  }, [selectedCity]);

  // Boolean to control whether the "Switch to Table View" button should be shown or hidden
  const showSwitchToTableView = viewMode !== 'both';

  return (
    <div className="App">
      <Navbar />

      <div className="view-toggle-icons">
        <div
          className={`icon-container ${viewMode === 'both' ? 'active' : ''}`}
          onClick={() => setViewMode('both')}
        >
          <FontAwesomeIcon icon={faMap} className="icon" />
        </div>
        <div
          className={`icon-container ${viewMode === 'sidebar' ? 'active' : ''}`}
          onClick={() => setViewMode('sidebar')}
        >
          <FontAwesomeIcon icon={faList} className="icon" />
        </div>
      </div>

      {/* Wrap both Sidebar and Map inside GoogleMapsLoader */}
      <GoogleMapsLoader>
        <div className={`main-container ${viewMode === 'sidebar' ? 'only-sidebar' : ''}`}>
          <Sidebar
            onFilterChange={handleFilterChange}
            onLocationSelect={setSelectedLocation}
            selectedLocation={selectedLocation} // Pass the selected location
            setRadius={setRadius} // Pass the setRadius function to Sidebar
            setDealers={setDealers}
            showSwitchToTableView={showSwitchToTableView} // Pass boolean to Sidebar
            viewMode={viewMode} // Pass viewMode to Sidebar
          />

          {/* Always render the Map component, just hide it when viewMode is 'sidebar' */}
          <div className={`map-area ${viewMode === 'sidebar' ? 'hidden-map' : ''}`}>
            <Map
              filterType={filter}
              selectedLocation={selectedLocation}
              resetMap={resetMap}
              radius={radius} // Pass the radius to the Map component
              dealers={dealers}
            />
          </div>
        </div>
      </GoogleMapsLoader>
    </div>
  );
}

export default B2CHomepage;
