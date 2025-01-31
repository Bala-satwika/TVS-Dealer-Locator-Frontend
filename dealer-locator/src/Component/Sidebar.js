import React, { useState } from 'react';
import SimpleAutocomplete from './SimpleAutocomplete';
import FilterButtons from './FilterButtons';
import DealerList from './DealerList'; // Import DealerList
import './Sidebar.css'; // Import Sidebar styles

const Sidebar = ({ onFilterChange, onLocationSelect, selectedLocation, setRadius, setDealers, showSwitchToTableView, viewMode }) => {
  const [radius, setLocalRadius] = useState(15); // Default radius is set to 15 km
  const [selectedFilters, setSelectedFilters] = useState({
    sales: true,   // Set sales as selected by default
    spares: false,  // Set spares as selected by default
    service: false, // Set service as selected by default
  });

  // Handle radius selection change
  const handleRadiusChange = (event) => {
    const newRadius = Number(event.target.value);
    setLocalRadius(newRadius); // Update local state
    setRadius(newRadius); // Update parent component state (passed via props)
  };

  return (
    <div className={`sidebar ${viewMode === 'sidebar' ? 'full-sidebar' : ''} ${viewMode === 'both' ? 'both-sidebar' : ''}`}>
      <div className="filter-container">
        {/* Search Bar for Autocomplete */}
        <SimpleAutocomplete onLocationSelect={onLocationSelect} />

        {/* Filter Buttons */}
        <FilterButtons setDealers={setDealers} setSelectedFilters={setSelectedFilters} />

        {/* Slider for Radius Selection */}
        <div className="radius-slider">
          <label htmlFor="radius" style={{ display: 'block' }}>
            Distance filtering: {radius} km
          </label>
          <div className="slider-container">
            <span className="slider-label">1 km</span>
            <input
              type="range"
              id="radius"
              min="1"
              max="150"
              value={radius}
              onChange={handleRadiusChange}
              className="slider"
              style={{ width: '100%' }} // Full width for the slider
            />
            <span className="slider-label">150 km</span>
          </div>
        </div>
      </div>

      {/* Render DealerList in both 'sidebar' and 'both' view modes */}
      {selectedLocation && (
        <div className={`dealer-list-right ${viewMode === 'sidebar' ? 'sidebar-view' : ''}`}>
          <DealerList
            lat={selectedLocation.lat}
            lng={selectedLocation.lng}
            radius={radius} // Pass the selected radius to DealerList
            selectedFilters={selectedFilters} // Pass selectedFilters
            showSwitchToTableView={showSwitchToTableView} // Pass boolean to DealerList
            parentViewMode={viewMode} // Pass viewMode to DealerList
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
