import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FilterButtons.css';
import API_BASE_URLS from '../config';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

const FilterButtons = ({ setDealers,setSelectedFilters}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setLocalSelectedFilters] = useState({
    sales: true,
    spares: false,
    service: false,
  });
  const [appliedFilters, setAppliedFilters] = useState(['sales']); // Start with 'sales' applied by default

  const toggleFilterPopup = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setLocalSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const applyFilters = async () => {
    setIsFilterOpen(false);
    const selectedTypes = Object.keys(selectedFilters).filter((key) => selectedFilters[key]);

    if (selectedTypes.length === 0) {
      // Resetting to default when no filters are applied
      setLocalSelectedFilters({ sales: true, spares: false, service: false });
      setAppliedFilters(['sales']);
    } else {
      setAppliedFilters(selectedTypes);
    }
    setSelectedFilters(selectedFilters);
    const queryString = selectedTypes.length > 0
      ? selectedTypes.map((type) => `type=${encodeURIComponent(type)}`).join('&')
      : '';

    try {
      const response = await axios.get(`${API_BASE_URLS.DEALERS.FILTER}?${queryString}`);
      setDealers(response.data);
    } catch (error) {
      console.error('Error fetching dealers:', error);
    }
  };

  // Effect to apply filters on initial render
  useEffect(() => {
    applyFilters();
  }, []); // Empty dependency array means it runs once on mount

  return (
    <div className="filter-section">
      <Button variant="contained" color="primary" onClick={toggleFilterPopup}>
        Filters <span id="selectedFilters">({appliedFilters.length})</span>
      </Button>

      <Dialog open={isFilterOpen} onClose={toggleFilterPopup}>
        <DialogTitle>Filter Options</DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={
              <Checkbox
                name="sales"
                checked={selectedFilters.sales}
                onChange={handleCheckboxChange}
              />
            }
            label="Sales"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="spares"
                checked={selectedFilters.spares}
                onChange={handleCheckboxChange}
              />
            }
            label="Spares"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="service"
                checked={selectedFilters.service}
                onChange={handleCheckboxChange}
              />
            }
            label="Service"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={applyFilters} color="primary">Apply Filter</Button>
        </DialogActions>
      </Dialog>

      {appliedFilters.length > 0 && (
        <div className="selected-filters">
          {appliedFilters.map((filter, index) => (
            <span key={index} className="filter-item">{filter}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterButtons;
