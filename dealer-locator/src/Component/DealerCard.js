import React from 'react';
import './DealerCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faClock, faMapMarkerAlt, faMap, faRoad } from '@fortawesome/free-solid-svg-icons';
import DirectionsIcon from '@mui/icons-material/Directions';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';  // Use Link for navigation

const DealerCard = ({ dealer, onZoomToLocation }) => {

  const renderLinks = () => {
    const links = [];

    if (dealer.type.includes('sales')) {
      links.push(
        <Link
          to={`/book-testride/${dealer.dealerId}/${dealer.name}`}
          key="test-ride"
          className="dealer-action-link-unique"
        >
          Book a Test Ride <ArrowForwardIcon />
        </Link>
      );
    }

    if (dealer.type.includes('service')) {
      links.push(
        <Link
          to={`/book-service/${dealer.dealerId}/${dealer.name}`}
          key="service"
          className="dealer-action-link-unique"
        >
          Book a Service <ArrowForwardIcon />
        </Link>
      );
    }

    if (dealer.type.includes('spares')) {
      links.push(
        <Link
          to={`/shop-spares/${dealer.name}`}
          key="spares"
          className="dealer-action-link-unique"
        >
          Shop for Spares <ArrowForwardIcon />
        </Link>
      );
    }

    return links;
  };

  return (
    <div className="dealer-card-unique">
      <div className="dealer-info-unique">
        <h3>{dealer.name}</h3>
        <div >
          <p>
            <FontAwesomeIcon icon={faRoad} /> <span className="dealer-detail-text-unique">Distance:</span> {dealer.distanceInKm} km
          </p>
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> <span className="dealer-detail-text-unique">Location:</span> {dealer.address}, {dealer.pincode}
          </p>
          <p>
            <FontAwesomeIcon icon={faClock} /> <span className="dealer-detail-text-unique">Timings:</span> {dealer.timings}
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} /> <span className="dealer-detail-text-unique">Contact:</span> {dealer.phoneNumber}
          </p>
          <p style={{ color: dealer.businessStatus ? 'green' : 'red' }}>
            <span className="dealer-detail-text-unique">Status:</span> {dealer.businessStatus ? "Open" : "Closed"}
          </p>
          <p>
            <span className="dealer-detail-text-unique">Ratings:</span> {dealer.ratings ? dealer.ratings : 'No ratings available'}
          </p>
        </div>
        <div className="dealer-actions-unique">
          {renderLinks()}
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dealer.name)}+${encodeURIComponent(dealer.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="get-directions-link-unique"
        >
          Get Directions <DirectionsIcon />
        </a>

      </div>
    </div>
  );
};

export default DealerCard;
