import React from 'react';
import './DealerDropdown.css'; // Import the CSS file for styling

const DealerDropdown = ({ dealers, selectedDealer, onDealerChange }) => {
  return (
    <div className="dropdown-container">
      <label className="dropdown-label">Select Dealer:</label>
      <select
        className="dealer-dropdown"
        value={selectedDealer}
        onChange={onDealerChange}
      >
        <option value="">-- Select a Dealer --</option>
        {dealers.map((dealer) => (
          <option key={dealer.dealerId} value={dealer.dealerId}>
            {dealer.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DealerDropdown;
