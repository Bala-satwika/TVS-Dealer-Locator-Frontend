/*global google*/
import React, { useEffect, useState, useRef } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { Link } from 'react-router-dom';
const Map = ({ filterType, selectedLocation, radius, dealers }) => {
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: 20.5937, lng: 78.9629 }); // Default to India center
  const [infoWindow, setInfoWindow] = useState(null);
  const [circle, setCircle] = useState(null);
  const mapRef = useRef(null); // To reference the map DOM element
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleLocationError = (error) => {
    console.error('Error getting location:', error);
  };







  // Initialize the map once Google Maps API is loaded
  useEffect(() => {
    if (!map) {
      const googleMap = new google.maps.Map(mapRef.current, {
        center: currentLocation,
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          mapTypeIds: ['roadmap', 'satellite'],
        },
      });

      setMap(googleMap);
      setInfoWindow(new google.maps.InfoWindow());
    }
  }, [map]);

  // Get user current location and update map center
  useEffect(() => {
    if (map && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(userLocation);
          map.setCenter(userLocation);
          map.setZoom(13); // Adjust zoom level as needed
        },
        () => {
          handleLocationError(true);
        }
      );
    }
  }, [map]);

  // Update map center when a new location is selected
  useEffect(() => {
    if (selectedLocation && map) {
      setCurrentLocation({ lat: selectedLocation.lat, lng: selectedLocation.lng });
      map.setCenter(new google.maps.LatLng(selectedLocation.lat, selectedLocation.lng));
      map.setZoom(13);
    }
  }, [selectedLocation, map]);

  const markersRef = useRef([]);

  // Handle rendering and clearing markers when dealers change
 // Define the logic to return the appropriate icon based on dealer.type
const getMarkerIcon = (type) => {
  // Sort the type array so the combinations are consistent
  const sortedType = type.sort().join(',');

  switch (sortedType) {
    case 'sales': 
      return '/motorcycle.png'; // Path to 'sales' icon
    case 'service': 
      return '/settings.png'; // Path to 'service' icon
    case 'spares': 
      return '/hot-sale.png'; // Path to 'spares' icon
    case 'sales,service': 
      return '/sales&serviceIcon.png'; // Path to 'sales + service' icon
    case 'sales,spares': 
      return '/spare-parts.png'; // Path to 'sales + spares' icon
    case 'service,spares': 
      return '/purchase.png'; // Path to 'service + spares' icon
    default: 
      return '/logo512.png'; // Default icon if none match
  }
};
const handleDialogOpen = () => {
  setDialogOpen(true);
};

// Function to handle closing the dialog
const handleDialogClose = () => {
  setDialogOpen(false);
};

useEffect(() => {
  if (markersRef.current.length > 0) {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  }

  if (map && dealers.length > 0) {
    dealers.forEach((dealer) => {
      // Get the appropriate marker icon based on dealer.type
      const markerIcon = getMarkerIcon(dealer.type);

      const marker = new google.maps.Marker({
        position: { lat: dealer.lat, lng: dealer.lng },
        map: map,
        icon: {
          url: markerIcon, // Set custom icon based on dealer.type
          scaledSize: new google.maps.Size(30, 30), // Adjust size as needed
        },
      });

      marker.addListener('mouseover', () => {
// When setting content for the info window
// Set content for info window using plain HTML
infoWindow.setContent(`
  <div style="max-width: 250px; font-family: 'Roboto', sans-serif; background-color: #f8f9fa; padding: 10px; border-radius: 8px;">
      <strong style="font-size: 1.2em; color: #343a40; display: block; margin-bottom: 8px;">${dealer.name}</strong>
      
      <span style="color: #495057; font-size: 0.9em; display: block; margin-bottom: 5px;">
        <strong style="color: #6c757d;">Address:</strong> ${dealer.address}
      </span>
      
      <span style="color: #495057; font-size: 0.9em; display: block; margin-bottom: 5px;">
        <strong style="color: #6c757d;">Ratings:</strong> ${renderStars(dealer.ratings).map((star) => star.props.children).join('')}
      </span>
      
      <span style="color: #495057; font-size: 0.9em; display: block; margin-bottom: 5px;">
        <strong style="color: #6c757d;">Timings:</strong> ${dealer.timings}
      </span>
      
      <span style="color: #495057; font-size: 0.9em; display: block; margin-bottom: 8px;">
        <strong style="color: #6c757d;">Dealer Type:</strong> ${renderDealerTypes(dealer.type)}
      </span>

      ${renderLinks(dealer)}<br/>
      
      <a
          href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dealer.name)}+${encodeURIComponent(dealer.address)}"
          target="_blank"
          rel="noopener noreferrer"
          style="color: #000; font-size: 0.9em; text-decoration: underline; display: inline-block; margin-top: 5px;"
        >
          Get Directions <span style="font-size: 1.2em;">↗</span>
      </a>
  </div>
`);
infoWindow.open(map, marker);





      });

      marker.addListener('mouseout', () => {
        infoWindow.close();
      });

      markersRef.current.push(marker);
    });
  }
}, [dealers, map, infoWindow]);


  // Handle the circle around the current location and radius changes
  useEffect(() => {
    if (map && currentLocation) {
      // Create the marker
      const marker = new google.maps.Marker({
        position: currentLocation,
        map: map,
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', // URL for the red water drop icon
          scaledSize: new google.maps.Size(30, 30), // Adjust size if necessary
        },
      });
  
      // If there's already a circle, just update it
      if (circle) {
        circle.setCenter(currentLocation);
        circle.setRadius(radius * 1000); // Convert km to meters
        const newZoomLevel = Math.max(1, 15 - Math.log2(radius));
        map.setZoom(newZoomLevel);
      } else {
        // Create a new circle
        const newCircle = new google.maps.Circle({
          strokeColor: '#0000FF',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.1,
          map: map,
          center: currentLocation,
          radius: radius * 1000, // Convert km to meters
        });
        setCircle(newCircle);
        const initialZoomLevel = Math.max(1, 15 - Math.log2(radius));
        map.setZoom(initialZoomLevel);
      }
  
      // Cleanup function to remove the marker when component unmounts or dependencies change
      return () => {
        marker.setMap(null); // Remove the marker from the map
      };
    }
  }, [map, currentLocation, radius]);
  

  return (
    <>
      <div ref={mapRef} style={{ height: '100vh', width: '100%' }}></div>
      
      <Button className='mt-5 mr-0 btn-success'
        variant="outlined" 
        onClick={handleDialogOpen} 
        style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000 }}
      >
        Marker Info
      </Button>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Marker Info</DialogTitle>
        <DialogContent>
          <div>
            <div>
              <img src="/motorcycle.png" alt="Sales Marker" style={{ width: '50px', marginRight: '10px' }} />
              <span>Sales</span>
            </div>
            <div>
              <img src="/settings.png" alt="Service Marker" style={{ width: '50px', marginRight: '10px' }} />
              <span>Service centers</span>
            </div>
            <div>
              <img src="/hot-sale.png" alt="Spares Marker" style={{ width: '50px', marginRight: '10px' }} />
              <span>Spares </span>
            </div>
            <div>
              <img src="/sales&serviceIcon.png" alt="Sales + Service Marker" style={{ width: '50px', marginRight: '10px' }} />
              <span>Sales + Service center</span>
            </div>
            <div>
              <img src="/spare-parts.png" alt="Sales + Spares Marker" style={{ width: '50px', marginRight: '10px' }} />
              <span>Sales + Spares</span>
            </div>
            <div>
              <img src="/purchase.png" alt="Service + Spares Marker" style={{ width: '50px', marginRight: '10px' }} />
              <span>Service center+ Spares </span>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Function to render star ratings
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

// Function to render dealer types with checkmarks
const renderDealerTypes = (types) => {
  return types
    .filter((type) => ['sales', 'service', 'spares'].includes(type)) // Filter valid types
    .map((type) => {
      if (type === 'sales') return '✅ Sales';
      if (type === 'service') return '✅ Service';
      if (type === 'spares') return '✅ Spares';
      return null; // Skip invalid types
    })
    .filter(Boolean) // Remove any null values
    .join(', '); // Join types with a comma
};

const renderLinks = (dealer) => {
  if (!dealer || !dealer.type) {
      return 'No actions available'; // Fallback content
  }

  const links = [];

  if (dealer.type.includes('sales')) {
      links.push(
          `<a href="/book-testride/${dealer.dealerId}/${dealer.name}" class="action-link">Book a Test Ride</a>`
      );
  }

  if (dealer.type.includes('service')) {
      links.push(
          `<a href="/book-service/${dealer.dealerId}/${dealer.name}" class="action-link">Book a Service</a>`
      );
  }

  if (dealer.type.includes('spares')) {
      links.push(
          `<a href="/shop-spares/${dealer.name}" class="action-link">Shop for Spares</a>`
      );
  }

  return links.length > 0 ? links.join("  , ") : 'No actions available';
};



export default Map;
