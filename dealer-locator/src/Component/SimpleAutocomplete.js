import React, { useState, useEffect, useRef } from 'react';
import locationIcon from '../Images/location.png';
import microphoneIcon from '../Images/microphone.png'; // Use your microphone icon image
import axios from 'axios';
import API_BASE_URLS from '../config';
import { Dialog, DialogContent, DialogTitle, CircularProgress, Typography, TextField } from '@mui/material';
import './SimpleAutocomplete.css'; // Keep your existing CSS if necessary
import ClearIcon from '@mui/icons-material/Close'; // Import a clear icon

const SimpleAutocomplete = ({ onLocationSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [autocomplete, setAutocomplete] = useState(null);
  const [recognition, setRecognition] = useState(null); // Speech recognition instance
  const [listening, setListening] = useState(false); // To track if mic is actively listening
  const [errorMessage, setErrorMessage] = useState(''); // To handle errors such as no speech
  const [voicePromptVisible, setVoicePromptVisible] = useState(false); // For showing the voice prompt
  const [spokenText, setSpokenText] = useState(''); // For displaying spoken text
  const inputRef = useRef(null); // Reference for the input field

  useEffect(() => {
    getCurrentLocation(); // Get the current location by default when the component mounts
    initSpeechRecognition(); // Initialize speech recognition on component mount
  }, []);

  useEffect(() => {
    const input = inputRef.current; // Use the ref for the input
    const options = {
      componentRestrictions: { country: 'IN' }, // Restrict autocomplete results to India
    };
    const autocompleteInstance = new window.google.maps.places.Autocomplete(input, options);
    setAutocomplete(autocompleteInstance);
  }, []);

  useEffect(() => {
    if (autocomplete) {
      const listener = autocomplete.addListener('place_changed', async () => {
        const place = autocomplete.getPlace();
        if (place && place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          const placeId = place.place_id; // Extract place_id
          setSearchTerm(place.formatted_address);
          console.log('Selected Place ID: ', placeId);

          // Call the API with the placeId to get lat/long from backend
          try {
            const response = await axios.get(API_BASE_URLS.GEOCODE, {
              params: { placeId },
            });
            console.log('Response from backend:', response.data);
          } catch (error) {
            console.error('Error fetching data from backend:', error);
          }

          onLocationSelect({ lat, lng, placeId });
        } else {
          console.error('No valid place found.');
        }
      });

      return () => {
        window.google.maps.event.removeListener(listener);
      };
    }
  }, [autocomplete, onLocationSelect]);

  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const latLng = { lat: latitude, lng: longitude };
          onLocationSelect(latLng); // Call the onLocationSelect prop with the current location

          try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
              params: {
                latlng: `${latitude},${longitude}`,
                key: process.env.REACT_APP_GOOGLEMAPS_API_KEY, // Use your Google Maps API key
              },
            });
            if (response.data.results.length > 0) {
              const placeId = response.data.results[0].place_id; // Get place_id
              const formattedAddress = response.data.results[0].formatted_address; // Get formatted address
              setSearchTerm(formattedAddress); // Set formatted address as the search term

              await axios.get(API_BASE_URLS.GEOCODE, {
                params: { placeId },
              });
            } else {
              console.error('No results found for current location.');
            }
          } catch (error) {
            console.error('Error fetching current location data:', error);
          }
        },
        (error) => {
          console.error('Error getting location: ', error);
          alert('Unable to retrieve your location.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const initSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true; // Allow interim results for real-time display
      recognitionInstance.lang = 'en-IN'; // Set language to English (India)
      setRecognition(recognitionInstance);

      recognitionInstance.onstart = () => {
        setListening(true);
        setVoicePromptVisible(true); // Show voice prompt when speaking starts
      };

      recognitionInstance.onresult = (event) => {
        const speechToText = event.results[0][0].transcript; // Get final transcript
        setSpokenText(speechToText); // Set spoken text for display
        setSearchTerm(speechToText); // Set the speech to the search term input field
        triggerAutocompleteUpdate(speechToText); // Trigger autocomplete with final text
        inputRef.current.focus(); // Ensure the input is focused after voice recognition
      };

      recognitionInstance.onend = () => {
        setListening(false); // Reset listening state
        setVoicePromptVisible(false); // Hide voice prompt when speaking stops
        setErrorMessage(''); // Clear error message
        setSpokenText(''); // Clear spoken text
      };

      recognitionInstance.onerror = (event) => {
        setErrorMessage('No speech detected. Please try again.'); // Handle no-speech error
        console.error('Speech recognition error:', event.error);
      };
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  };

  const triggerAutocompleteUpdate = (finalSpeechText) => {
    setSearchTerm(finalSpeechText); // Set the input's value to the final recognized speech text
    const input = inputRef.current;
    const event = new Event('input', { bubbles: true });
    input.value = finalSpeechText; // Set the value directly
    input.dispatchEvent(event); // Trigger the event
  };

  const startListening = () => {
    if (recognition && !listening) {
      recognition.start();
    }
  };

  return (
    <div className="search-section">
        <div className="input-container">
            <TextField
                id="autocomplete-input"
                type="text"
                placeholder="Enter Pin Code or City"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Allow manual input
                inputRef={inputRef} // Attach ref to the input
                InputProps={{
                    endAdornment: (
                        <>
                            {searchTerm && ( // Only show the clear button if there is text
                                <ClearIcon
                                    className="clear-button"
                                    onClick={() => {
                                        setSearchTerm(''); // Clear the input
                                        inputRef.current.focus(); // Focus back on the input
                                    }}
                                />
                            )}
                            <img
                                src={microphoneIcon}
                                alt="Microphone"
                                className="microphone-icon"
                                onClick={startListening} // Start speech recognition on mic icon click
                            />
                        </>
                    ),
                }}
                variant="outlined" // Use outlined style for the text field
                fullWidth // Make the text field take full width
            />
            <img
                src={locationIcon}
                alt="Current Location"
                className="current-location-icon"
                onClick={getCurrentLocation} // Call getCurrentLocation on icon click
            />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <Dialog open={voicePromptVisible} onClose={() => setVoicePromptVisible(false)} aria-labelledby="voice-prompt-title">
            <DialogTitle id="voice-prompt-title">
                {listening ? 'Listening...' : 'Voice Prompt'}
            </DialogTitle>
            <DialogContent>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {listening && <CircularProgress style={{ marginRight: '10px' }} />}
                    <Typography variant="h6">{spokenText || 'Speak now...'}</Typography>
                </div>
            </DialogContent>
        </Dialog>
    </div>
);

};

export default SimpleAutocomplete;
