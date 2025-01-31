import React, { useState, useEffect } from 'react';

const CityDropdown = ({ onCitySelect }) => {
  const [states, setStates] = useState([]); // Store states fetched from API
  const [selectedCity, setSelectedCity] = useState('');

  // Fetch states from backend API when the component mounts
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch('http://localhost:8076/api/dealers/states');
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setStates(data); // Set the fetched states into the state
        } else {
          console.error('Error fetching states:', response.status);
        }
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, []); // Empty dependency array ensures this runs once when component mounts

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    onCitySelect(city); // Pass the selected city back to the parent component
  };

  return (
    <div className="city-dropdown-right">
      <select id="city" value={selectedCity} onChange={handleCityChange}>
        <option value="">Choose a City</option>
        {states.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CityDropdown;
